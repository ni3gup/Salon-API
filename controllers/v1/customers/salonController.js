const { Validator } = require("node-input-validator");

const Salon = require('../../../models/Salon');
const SalonSpecialization = require("../../../models/SalonSpecialization");
const Gender = require("../../../models/Gender");
const SalonImage = require("../../../models/SalonImage");
const SalonFacility = require("../../../models/SalonFacility");
const salonEloquent = require('../../../eloquents/customer/salonEloquent');
const errorHandler = require('../../../helpers/errorHandler');
const { distance } = require('../../../helpers/common');

require('dotenv').config;

const getSalons = async (req, res, next) => {
    const rules = salonEloquent.latLngRules();
    const messages = salonEloquent.latLngMessages();

    const latitude = req.query.latLng.split(',')[0];
    const longitude = req.query.latLng.split(',')[1];
    let whereCondition = {
        is_active: 1
    }

    try {
        const v = new Validator(req.query, rules, messages);
        const matched = await v.check();

        if (!matched) {
            throw errorHandler(false, "Invalid Inputs", 422, v.errors);
        }

        const customer = await salonEloquent.getCustomerFromAuth(req);

        if (customer) {
            whereCondition = { ...whereCondition, gender_id: customer.gender_id };
        }

        console.log(whereCondition);

        let salons = await Salon.findAll({
            where: {
                is_active: 1
            },
            attributes: {
                exclude: ['created_at', 'updated_at', 'deleted_at', 'is_active']
            },
            include: {
                model: SalonSpecialization,
                attributes: ['gender_id'],
                where: whereCondition,
                include: {
                    model: Gender,
                    attributes: ['name'],
                    where: {
                        is_active: 1
                    }
                }
            }
        });

        salons = salons.map(salon => {
            salon = salon.dataValues;

            return {
                ...salon,
                distance_difference: distance(latitude, longitude, salon.latitude, salon.longitude, 'K')
            }
        });

        salons.sort((a, b) => a.distance_difference - b.distance_difference);

        res.json(salons);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
}

const getSalon = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        throw errorHandler(false, 'Invalid Salon', 422);
    }

    try {
        const salon = await Salon.findOne({
            where: {
                is_active: 1,
                id
            },
            attributes: {
                exclude: ['created_at', 'updated_at', 'deleted_at', 'is_active']
            },
            include: [
                {
                    model: SalonFacility,
                    attributes: {
                        exclude: ['salon_id', 'created_at', 'updated_at', 'deleted_at', 'is_active']
                    },
                    where: {
                        is_active: 1
                    },
                    required: false
                },
                {
                    model: SalonImage,
                    attributes: {
                        exclude: ['salon_id', 'created_at', 'updated_at', 'deleted_at', 'is_active']
                    },
                    where: {
                        is_active: 1
                    },
                    required: false
                },
            ]
        });

        if (!salon) {
            throw errorHandler(false, 'Invalid Salon', 422);
        }

        return res.json(salon);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
}

module.exports = { getSalons, getSalon };
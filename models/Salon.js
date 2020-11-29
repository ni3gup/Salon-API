const { INTEGER, STRING, DATE, Sequelize } = require("sequelize");

const sequelize = require("../db");
const SalonFacility = require('./SalonFacility');
const SalonSpecialization = require('../models/SalonSpecialization');
const SalonImage = require('../models/SalonImage');

const Salon = sequelize.define("salons", {
    id: {
        type: INTEGER,
        autoincrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: STRING,
        allowNull: false
    },
    description: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        unique: true,
        allowNull: false
    },
    mobile: {
        type: STRING,
        unique: true,
        allowNull: false
    },
    address: {
        type: STRING,
        allowNull: false
    },
    city: {
        type: STRING,
        allowNull: false
    },
    state: {
        type: STRING,
        allowNull: false
    },
    pincode: {
        type: STRING,
        allowNull: false
    },
    latitude: {
        type: INTEGER,
        allowNull: false
    },
    longitude: {
        type: INTEGER,
        allowNull: false
    },
    working_hours_description: {
        type: STRING,
        allowNull: false
    },
    is_active: {
        type: INTEGER,
        defaultValue: 1
    },
    created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
    },
    updated_at: {
        type: DATE,
        allowNull: true
    },
    deleted_at: {
        type: DATE,
        allowNull: true
    },
}, {
    tableName: 'salons',
    timestamps: false
});

Salon.hasMany(SalonFacility, { foreignKey: 'salon_id' });
Salon.hasMany(SalonSpecialization, { foreignKey: 'salon_id' });
Salon.hasMany(SalonImage, { foreignKey: 'salon_id' });

module.exports = Salon;

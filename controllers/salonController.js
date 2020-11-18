const Salon = require('../models/Salon');
const SalonFacilities = require('../models/SalonFacilities');

const getSalons = async (req, res, next) => {
    try {
        const salons = await Salon.findAll({
            where: {
                is_active: 1
            },
            include: SalonFacilities
        })
    
        res.json({ salons });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Oops! Something went wrong' });
    }
}

module.exports = { getSalons };
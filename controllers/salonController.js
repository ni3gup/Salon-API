const Salon = require('../models/Salon');

const getSalons = async (req, res, next) => {
    try {
        const salons = await Salon.findAll({
            where: {
                is_active: 1
            }
        })
    
        res.json({ salons });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Oops! Something went wrong' });
    }
}

module.exports = { getSalons };
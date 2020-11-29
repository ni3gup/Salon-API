const Gender = require('../../models/Gender');

const getGenders = async (req, res, next) => {
    try {
        const genders = await Gender.findAll({
            attributes: ['id', 'name'],
            where: {
                is_active: 1
            }
        });

        res.json({ genders });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
}

module.exports = { getGenders }
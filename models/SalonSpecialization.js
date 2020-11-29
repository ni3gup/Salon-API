const { INTEGER, STRING, DATE, Sequelize, DECIMAL } = require("sequelize");

const sequelize = require("../db");
const Salon = require('../models/Salon');
const Gender = require('../models/Gender');

const SalonSpecialization = sequelize.define("salon_specializations", {
    id: {
        type: INTEGER,
        autoincrement: true,
        allowNull: false,
        primaryKey: true,
    },
    salon_id: {
        type: INTEGER,
        allowNull: false,
        references: Salon
    },
    salon_id: {
        type: INTEGER,
        allowNull: false,
        references: Salon
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
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
    },
    deleted_at: {
        type: DATE,
        allowNull: true
    },
}, {
    tableName: 'salon_specializations',
    timestamps: false
});

SalonSpecialization.belongsTo(Gender, { foreignKey: 'gender_id' });

module.exports = SalonSpecialization;

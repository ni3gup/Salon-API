const { INTEGER, STRING, DATE, Sequelize, DECIMAL } = require("sequelize");

const sequelize = require("../db");
const Salon = require('../models/Salon');

const SalonFacilities = sequelize.define("salon_facilities", {
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
    name: {
        type: STRING,
        allowNull: false
    },
    price: {
        type: DECIMAL,
        allowNull: false
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
    }
}, {
    tableName: 'salon_facilities',
    timestamps: false
});

module.exports = SalonFacilities;

const { INTEGER, STRING, DATE, Sequelize } = require("sequelize");

const sequelize = require("../db");
const SalonFacilities = require('../models/SalonFacilities');

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
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
    }
}, {
    tableName: 'salons',
    timestamps: false
});

Salon.hasMany(SalonFacilities, { foreignKey: 'salon_id' });

module.exports = Salon;

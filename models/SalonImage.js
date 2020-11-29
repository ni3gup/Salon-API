const { INTEGER, STRING, DATE, Sequelize } = require("sequelize");

const sequelize = require("../db");
const Salon = require('../models/Salon');

const SalonImage = sequelize.define("salon_images", {
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
    image: {
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
    },
    deleted_at: {
        type: DATE,
        allowNull: true
    },
}, {
    tableName: 'salon_images',
    timestamps: false
});

module.exports = SalonImage;

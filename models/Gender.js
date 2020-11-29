const { INTEGER, STRING, DATE, Sequelize } = require("sequelize");

const sequelize = require("../db");

const Gender = sequelize.define("genders", {
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
    }
}, {
    tableName: 'genders',
    timestamps: false
});

module.exports = Gender;

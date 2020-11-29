const { INTEGER, STRING, DATE, Sequelize } = require("sequelize");

const sequelize = require("../db");
const Gender = require('./Gender');

const Customer = sequelize.define("customers", {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: STRING,
        allowNull: false
    },
    gender_id: {
        type: INTEGER,
        allowNull: false,
        references: Gender
    },
    google_user_id: {
        type: STRING,
        allowNull: true
    },
    email: {
        type: STRING,
        unique: true,
        allowNull: false
    },
    phone: {
        type: STRING,
        unique: true,
        allowNull: false
    },
    profile_photo: {
        type: STRING,
        allowNull: true
    },
    password: {
        type: STRING,
        allowNull: false
    },
    reset_password_expires: {
        type: DATE,
        allowNull: true,
        defaultValue: null
    },
    reset_password_token: {
        type: STRING,
        allowNull: true
    },
    verification_token: {
        type: STRING,
        allowNull: true
    },
    access_token: {
        type: STRING,
        allowNull: true
    },
    is_active: {
        type: INTEGER,
        defaultValue: 1
    },
    is_verified: {
        type: INTEGER,
        defaultValue: 0
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
    tableName: 'customers',
    timestamps: false
});

module.exports = Customer;

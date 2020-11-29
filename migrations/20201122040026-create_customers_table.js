'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      gender_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      google_user_id: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      email: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: false,
        unique: true
      },
      profile_photo: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
      },
      password: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      reset_password_expires: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      },
      reset_password_token: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      verification_token: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      access_token: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      is_verified: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: 0
      },
      is_active: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: 1
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      },
      deleted_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('customers');
  }
};

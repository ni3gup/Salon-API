'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('salons', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.STRING(500),
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      mobile: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: false,
        unique: true
      },
      address: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false
      },
      city: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      state: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      pincode: {
        type: Sequelize.DataTypes.INTEGER(10),
        allowNull: false
      },
      latitude: {
        type: Sequelize.DataTypes.DECIMAL(20, 10),
        allowNull: false
      },
      longitude: {
        type: Sequelize.DataTypes.DECIMAL(20, 10),
        allowNull: false
      },
      working_hours_description: {
        type: Sequelize.DataTypes.TEXT(),
        allowNull: false
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
    await queryInterface.dropTable('salons');
  }
};
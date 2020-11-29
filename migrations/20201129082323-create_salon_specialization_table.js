'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('salon_specializations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      salon_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      gender_id: {
        type: Sequelize.DataTypes.INTEGER,
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
    await queryInterface.dropTable('salon_specializations');
  }
};
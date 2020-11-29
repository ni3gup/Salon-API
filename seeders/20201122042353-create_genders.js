'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('genders', [
      {
        name: 'Male'
      },
      {
        name: 'Female'
      },
      {
        name: 'Other'
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('genders', null, {});
  }
};

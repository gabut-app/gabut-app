'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users', [
      {
        email: 'gabut@mail.com',
        password: 'gabut123',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, {})
  }
};

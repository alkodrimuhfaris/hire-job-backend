'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Companies', [
      {
        name: 'Tuku Bae',
        field: 'Ecommerce',
        city: 'Jakarta',
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Send Bae',
        field: 'Comunication',
        city: 'Jakarta',
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}

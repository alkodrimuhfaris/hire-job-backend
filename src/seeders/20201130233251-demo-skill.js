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
    return queryInterface.bulkInsert('Skills', [
      {
        name: 'HTML',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'PHP',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'C++',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kotlin',
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

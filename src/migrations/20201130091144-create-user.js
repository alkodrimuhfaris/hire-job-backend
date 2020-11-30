'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      instagram: {
        type: Sequelize.STRING
      },
      github: {
        type: Sequelize.STRING
      },
      linkedin: {
        type: Sequelize.STRING
      },
      jobTitle: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
      },
      company: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      photo: {
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users')
  }
}

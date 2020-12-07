'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('WorkExperiences', 'finishAt', {
      type: Sequelize.DATEONLY,
      defaultValue: null,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('WorkExperiences', 'finishAt', {
      type: Sequelize.DATEONLY
    });
  }
};

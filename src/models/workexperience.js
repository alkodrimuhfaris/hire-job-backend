'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class WorkExperience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      WorkExperience.belongsTo(models.Company, { foreignKey: 'companyId' })
      WorkExperience.belongsTo(models.User, { foreignKey: 'userId' })
    }
  };
  WorkExperience.init({
    companyId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
    startAt: DataTypes.DATEONLY,
    finishAt: DataTypes.DATEONLY,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'WorkExperience'
  })
  return WorkExperience
}

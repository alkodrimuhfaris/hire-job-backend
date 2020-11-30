'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class WorkerSkill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      WorkerSkill.belongsTo(models.User, { foreignKey: 'workerId' })
      WorkerSkill.belongsTo(models.Skill, { foreignKey: 'skillId' })
    }
  };
  WorkerSkill.init({
    workerId: DataTypes.INTEGER,
    skillId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WorkerSkill'
  })
  return WorkerSkill
}

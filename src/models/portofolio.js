'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Portofolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Portofolio.belongsTo(models.User, { foreignKey: 'userId' })
    }
  };
  Portofolio.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    publicLink: DataTypes.STRING,
    repoLink: DataTypes.STRING,
    company: DataTypes.STRING,
    type: DataTypes.BOOLEAN,
    photo: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Portofolio'
  })
  return Portofolio
}

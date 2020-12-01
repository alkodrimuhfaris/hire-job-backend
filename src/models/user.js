'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: 'roleId' })
      User.hasOne(models.Company, { foreignKey: 'authorId' })
      User.hasMany(models.Portofolio, { foreignKey: 'userId' })
      User.hasMany(models.WorkerSkill, { foreignKey: 'workerId' })
      User.hasMany(models.WorkExperience, { foreignKey: 'userId' })
      User.hasMany(models.Message, { foreignKey: 'sender', as: 'SenderDetails' })
      User.hasMany(models.Message, { foreignKey: 'recipient', as: 'RecipientDetails' })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    instagram: DataTypes.STRING,
    github: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    address: DataTypes.TEXT,
    company: DataTypes.STRING,
    bio: DataTypes.TEXT,
    photo: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}

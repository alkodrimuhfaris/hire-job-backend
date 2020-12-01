'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Message.belongsTo(models.User, { foreignKey: 'sender', as: 'SenderDetails' })
      Message.belongsTo(models.User, { foreignKey: 'recipient', as: 'RecipientDetails' })
    }
  };
  Message.init({
    sender: DataTypes.INTEGER,
    recipient: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    isLates: DataTypes.BOOLEAN,
    unread: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Message'
  })
  return Message
}

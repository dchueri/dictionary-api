"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Words extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.belongsToMany(models.Words, {
        through: User_Words,
        uniqueKey: 'userIds',
      })
      models.Words.belongsToMany(models.Users, {
        through: User_Words,
        uniqueKey: 'wordsIds',
      })
    }
  }
  User_Words.init(
    {},
    {
      sequelize,
      modelName: "user_words",
    }
  );
  return User_Words;
};

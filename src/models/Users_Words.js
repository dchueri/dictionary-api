"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users_Words extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.belongsToMany(models.Words, {
        through: Users_Words,
        uniqueKey: 'userId',
      })
      models.Words.belongsToMany(models.Users, {
        through: Users_Words,
        uniqueKey: 'wordId',
      })
    }
  }
  Users_Words.init(
    {},
    {
      sequelize,
      modelName: "users_words",
    }
  );
  return Users_Words;
};

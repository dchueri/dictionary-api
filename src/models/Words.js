"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Words extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Words.init(
    {
      word: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Words",
    }
  );
  Words.removeAttribute("createdAt");
  Words.removeAttribute("updatedAt");

  return Words;
};

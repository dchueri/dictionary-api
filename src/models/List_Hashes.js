'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List_Hashes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  List_Hashes.init({
    hash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'list_hashes',
  });
  return List_Hashes;
};
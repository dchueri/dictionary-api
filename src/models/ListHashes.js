'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListHashes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ListHashes.init({
    hash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'list_hashes',
  });
  return ListHashes;
};
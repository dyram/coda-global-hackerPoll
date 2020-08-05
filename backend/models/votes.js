'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Votes.belongsTo(models.Hackers, { foreignKey: "HackerId" })
      Votes.belongsTo(models.Users, { foreignKey: "UserId" })
    }
  };
  Votes.init({
    isVoted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Votes',
  });
  return Votes;
};
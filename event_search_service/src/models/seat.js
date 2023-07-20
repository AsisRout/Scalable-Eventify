'use strict';
const {
  Model
} = require('sequelize');
const { ENUMS } = require('../utils/commons')
const { NORMAL, EXECUTIVE, PREMIUM } = ENUMS;

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Venue,{
        foreignKey: 'venueId'
      });
    }
  }
  Seat.init({
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    column: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: [NORMAL, EXECUTIVE, PREMIUM]
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};
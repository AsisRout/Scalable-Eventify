'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Show extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Event,{
        foreignKey: 'eventId'
      });
      this.belongsTo(models.Venue,{
        foreignKey: 'venueId'
      });
    }
  }
  Show.init({
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Show',
  });
  return Show;
};
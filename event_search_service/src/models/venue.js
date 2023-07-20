'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City,{
        foreignKey: 'cityId'
      });
      this.hasMany(models.Show);
      this.hasMany(models.Seat);
    }
  }
  Venue.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Venue',
  });
  return Venue;
};
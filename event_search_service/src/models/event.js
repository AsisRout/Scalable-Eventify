'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category,{
        foreignKey: 'categoryId'
      });
      this.hasMany(models.Show);
    }
  }
  Event.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING
    },
    interestedCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    categoryId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
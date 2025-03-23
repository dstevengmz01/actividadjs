'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Libro extends Model {
    static associate(models) {
      Libro.hasMany(models.Prestamo, {foreignKey: 'libro_id',as: 'prestamos',});
    }
  }
  Libro.init({
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    aniopublic: DataTypes.DATE,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Libro',
    timestamps: true 
  });
  return Libro;
};
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Prestamo, {
        foreignKey: 'usuario_id',
        as: 'prestamos',
      });
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
    timestamps: true 
  });
  return Usuario;
};
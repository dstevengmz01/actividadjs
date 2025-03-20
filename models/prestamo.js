'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prestamo extends Model {
    static associate(models) {
      Prestamo.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
        as: 'usuario',
      });

      Prestamo.belongsTo(models.Libro, {
        foreignKey: 'libro_id',
        as: 'libro',
      });
    }
  }
  Prestamo.init({
    usuario_id: DataTypes.INTEGER,
    libro_id: DataTypes.INTEGER,
    fecha_prestamo: DataTypes.DATE,
    fechadevolucion: DataTypes.DATE,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Prestamo',
    timestamps: true 
  });
  return Prestamo;
};

const { Usuario } = require('../models'); 

class UsuarioService 
{
    static async obtenerUsuario() {
        try {
            return await Usuario.findAll();
        } catch (error) {
            console.log("Error al obtener los usuarios:", error);
        }
    }

    static async crearUsuario(nombre,correo,telefono) {
        try {
            return await Usuario.create({ nombre,correo,telefono });
        } catch (e) {
            console.log("Error en el servidor al guardar el usuario:", e);
        }
    }

    static async eliminarUsuario(id) {
        try {
            let resultadoB = await Usuario.findByPk(id);
            if (resultadoB) {
                await resultadoB.destroy();
            } else {
                console.log("usuario no encontrado.");
            }
        } catch (e) {
            console.log("Error en el servidor al eliminar usuario:", e);
        }
    }

    static async actualizarUsuario(id, datos) {
        try {
            let actualizado = await Usuario.update(datos, { where: { id } });
            return actualizado;
        } catch (e) {
            console.log("Error en el servidor al actualizar el usuario:", e);
        }
    }
}

module.exports = UsuarioService;

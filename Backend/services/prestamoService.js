
const { Prestamo } = require('../models'); 

class PrestamoService 
{
    static async obtenerPrestamo() {
        try {
            return await Prestamo.findAll();
        } catch (error) {
            console.log("Error al obtener los prestamos:", error);
        }
    }

    static async crearPrestamo(usuario_id,libro_id,fecha_prestamo,fechadevolucion,estado) {
        try {
            return await Prestamo.create({ usuario_id,libro_id,fecha_prestamo,fechadevolucion,estado });
        } catch (e) {
            console.log("Error en el servidor al guardar el prestamo:", e);
        }
    }

    static async eliminarPrestamo(id) {
        try {
            let resultadoB = await Prestamo.findByPk(id);
            if (resultadoB) {
                await resultadoB.destroy();
            } else {
                console.log("Prestamo no encontrado.");
            }
        } catch (e) {
            console.log("Error en el servidor al eliminar prestamo:", e);
        }
    }

    static async actualizarPrestamo(id, datos) {
        try {
            let actualizado = await Prestamo.update(datos, { where: { id } });
            return actualizado;
        } catch (e) {
            console.log("Error en el servidor al actualizar el Prestamo:", e);
        }
    }
}

module.exports = PrestamoService;


const { Libro } = require('../models'); 

class LibroService 
{
    static async obtenerLibro() {
        try {
            return await Libro.findAll();
        } catch (error) {
            console.log("Error al obtener los libros:", error);
        }
    }

    static async crearLibro(titulo,autor,aniopublic,stock) {
        try {
            return await Libro.create({ titulo,autor,aniopublic,stock });
        } catch (e) {
            console.log("Error en el servidor al guardar el libro:", e);
        }
    }

    static async eliminarLibro(id) {
        try {
            let resultadoB = await Libro.findByPk(id);
            if (resultadoB) {
                await resultadoB.destroy();
            } else {
                console.log("Libro no encontrado.");
            }
        } catch (e) {
            console.log("Error en el servidor al eliminar libro:", e);
        }
    }

    static async actualizarLibro(id, datos) {
        try {
            let actualizado = await Libro.update(datos, { where: { id } });
            return actualizado;
        } catch (e) {
            console.log("Error en el servidor al actualizar el libro:", e);
        }
    }
}

module.exports = LibroService;

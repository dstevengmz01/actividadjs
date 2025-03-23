const libroService = require("../services/libroService");

class LibroController 
{
    static async listarLibro(req, res) {
        try {
            let lista = await libroService.obtenerLibro();
            res.json(lista);
        } catch (e) {
            res.status(500).json({ error: "Error en la petición" });
        }
    }

    static async crearLibro(req, res) {
        try {
            let { titulo,autor,aniopublic,stock } = req.body;
            let reserva = await libroService.crearLibro(titulo,autor,aniopublic,stock);
            res.json(reserva);
        } catch (e) {
            res.status(500).json({ error: "Error en la petición" });
        }
    }

    static async eliminarLibro(req, res) {
        try {
            const { id } = req.params;
            if (isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" });
            }
            let resultado = await libroService.eliminarLibro(id);

            if (!resultado) {
                return res.status(404).json({ error: "libro no encontrado" });
            }
            res.json({ mensaje: "libro eliminado correctamente" });
        } catch (e) {
            res.status(500).json({ error: "Error en el servidor al eliminar el libro" });
        }
    }

    static async actualizarLibro(req, res) {
        try {
            const { id } = req.params;
            const { titulo,autor,aniopublic,stock } = req.body;

            if (isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" });
            }

            let resultado = await libroService.actualizarLibro(id, {titulo,autor,aniopublic,stock});

            if (!resultado[0]) {
                return res.status(404).json({ error: "libro no encontrado" });
            }

            res.json({ mensaje: "libro actualizado correctamente" });
        } catch (e) {
            res.status(500).json({ error: "Error en el servidor al actualizar el libro" });
        }
    }
}

module.exports = LibroController;

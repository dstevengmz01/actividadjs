const PrestamoService = require("../services/prestamoService");

class PrestamoController 
{
    static async listarPrestamo(req, res) {
        try {
            let lista = await PrestamoService.obtenerPrestamo();
            res.json(lista);
        } catch (e) {
            res.status(500).json({ error: "Error en la petición" });
        }
    }

    static async crearPrestamo(req, res) {
        try {
            let { usuario_id,libro_id,fecha_prestamo,fechadevolucion,estado } = req.body;
            let reserva = await PrestamoService.crearLibro(usuario_id,libro_id,fecha_prestamo,fechadevolucion,estado);
            res.json(reserva);
        } catch (e) {
            res.status(500).json({ error: "Error en la petición" });
        }
    }

    static async eliminarPrestamo(req, res) {
        try {
            const { id } = req.params;
            if (isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" });
            }
            let resultado = await PrestamoService.eliminarPrestamo(id);
            if (!resultado) {
                return res.status(404).json({ error: "prestamo no encontrado" });
            }
            res.json({ mensaje: "prestamo eliminado correctamente" });
        } catch (e) {
            res.status(500).json({ error: "Error en el servidor al eliminar el prestamo" });
        }
    }

    static async actualizarPrestamo(req, res) {
        try {
            const { id } = req.params;
            const { usuario_id,libro_id,fecha_prestamo,fechadevolucion,estado } = req.body;

            if (isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" });
            }

            let resultado = await PrestamoService.actualizarPrestamo(id, {usuario_id,libro_id,fecha_prestamo,fechadevolucion,estado});

            if (!resultado[0]) {
                return res.status(404).json({ error: "prestamo no encontrado" });
            }

            res.json({ mensaje: "prestamo actualizado correctamente" });
        } catch (e) {
            res.status(500).json({ error: "Error en el servidor al actualizar el prestamo" });
        }
    }
}

module.exports = PrestamoController;

const usuarioService = require("../services/usuarioService");

class UsuarioController 
{
    static async listarUsuario(req, res) {
        try {
            let lista = await usuarioService.obtenerUsuario();
            res.json(lista);
        } catch (e) {
            res.status(500).json({ error: "Error en la petición" });
        }
    }

    static async crearUsuario(req, res) {
        try {
            let { nombre,correo,telefono } = req.body;
            let reserva = await usuarioService.crearUsuario(nombre,correo,telefono);
            res.json(reserva);
        } catch (e) {
            res.status(500).json({ error: "Error en la petición" });
        }
    }

    static async eliminarUsuario(req, res) {
        try {
            const { id } = req.params;
            if (isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" });
            }
            let resultado = await usuarioService.eliminarUsuario(id);

            if (!resultado) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            res.json({ mensaje: "usuario eliminado correctamente" });
        } catch (e) {
            res.status(500).json({ error: "Error en el servidor al eliminar el usuario" });
        }
    }

    static async actualizarUsuario(req, res) {
        try {
            const { id } = req.params;
            const { nombre,correo,telefono } = req.body;
            if (isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" });
            }
            let resultado = await usuarioService.actualizarUsuario(id, {nombre,correo,telefono});

            if (!resultado[0]) {
                return res.status(404).json({ error: "usuario no encontrado" });
            }

            res.json({ mensaje: "usuario actualizado correctamente" });
        } catch (e) {
            res.status(500).json({ error: "Error en el servidor al actualizar el usuario" });
        }
    }
}

module.exports = UsuarioController;

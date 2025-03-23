const express = require('express');
const Usuario = require('../controllers/usuariosControllers');
const router = express.Router();

router.get('/usuario', Usuario.listarUsuario);
router.post('/usuario', Usuario.crearUsuario);
router.delete('/usuario/:id', Usuario.eliminarUsuario);
router.put('/usuario/:id', Usuario.actualizarUsuario);
router.get('/usuario/:id', Usuario.BuscarUsuario);
module.exports = router;

const express = require('express');
const Prestamo = require('../controllers/prestamoControllers');
const router = express.Router();

router.get('/prestamo', Prestamo.listarPrestamo);
router.post('/prestamo', Prestamo.crearPrestamo);
router.delete('/prestamo/:id', Prestamo.eliminarPrestamo);
router.put('/prestamo/:id', Prestamo.actualizarPrestamo);

module.exports = router;

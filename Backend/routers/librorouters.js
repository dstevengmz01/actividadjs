const express = require('express');
const Libro = require('../controllers/libroControllers');
const router = express.Router();

router.get('/libro', Libro.listarLibro);
router.post('/libro', Libro.crearLibro);
router.delete('/libro/:id', Libro.eliminarLibro);
router.put('/libro/:id', Libro.actualizarLibro);
router.get('/libro/:id', Libro.BuscarLibro);
module.exports = router;

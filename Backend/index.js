const express = require('express');
const cors = require('cors');

const app = express();
const puerto = 2100;

app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

app.use(express.json());

const usuario = require('./routers/usuariosrouters');
const libro = require('./routers/librorouters');
const prestamo = require('./routers/prestamorouters');

app.use('/api',usuario);
app.use('/api',libro);
app.use('/api',prestamo);

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});

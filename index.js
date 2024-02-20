const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/local')
    .then(() => {
        console.log('Conexion exitosa a la base de datos');
    })
    .catch((err) => {
        console.log('Error en la base de datos:', err);
    })

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Escuchando puerto:', PORT);
})
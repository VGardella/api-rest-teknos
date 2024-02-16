const express = require('express');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('api/:user/', routes);

app.listen(PORT, () => {
    console.log('Escuchando puerto:', PORT);
})
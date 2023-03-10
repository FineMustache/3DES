

const PORT = 5000
const express = require('express');
const cors = require('cors');

const app = express();
const routes = require('./routes.js');

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(PORT, () => {
    console.log('Servidor em execução na porta ' + PORT);
});
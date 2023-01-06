const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://lgomees:lgo194879@backendtcc.xds1j67.mongodb.net/?retryWrites=true&w=majority') 

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
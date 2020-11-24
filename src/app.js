const server = require('./config/server.config');
const express = require('express');
require('./database/database');
const app = express();


//settings
app.set('port', server.port);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes 
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/login'));
app.use('/api/cryptos',require('./routes/crypto'));

async function initServer() {
    await app.listen(app.get('port'));
    console.log('Server listening on port', app.get('port'));
}

initServer();
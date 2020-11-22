const server = require('./config/server.config');
const express = require('express');
// require('./database');
const app = express();
// const bodyParser = require ('body-parser')

//settings
app.set('port', server.port);

//middlewares
app.use(express.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());

//routes 
// app.use('/api/users', require('./src/routes/users'));
// app.use('/api/pubs', require('./src/routes/pubs'));

async function main() {
    await app.listen(app.get('port'));
    console.log('Back ayudarg listening on port', app.get('port'));
}

main();
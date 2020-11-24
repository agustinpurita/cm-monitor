const mongoose = require('mongoose');
const db = require('../config/database.config');
const setInitialCryptos = require('./initCryptos');

async function connectdb({ uri }) {
    await mongoose.connect('mongodb://localhost/crypto', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
        .then(() => console.log('DB is connected'))
        .catch((err) => console.log(err));
}
connectdb(db);

const conn = mongoose.connection;
setInitialCryptos(conn);





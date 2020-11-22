const mongoose = require('mongoose');
const db = require('./config/database.config');

mongoose.connection.on('open', () => {
    console.log(`Connected to ${db.name} database.`);
});

async function connectdb({ uri }) {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
}
try {
    connectdb(db);
} catch (error) {
    console.log(`Error al conectar con la base de datos: ${error}`);
}
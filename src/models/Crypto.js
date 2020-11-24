const { Schema, model } = require('mongoose');

const cryptoSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        }
    },
);

module.exports = model('Crypto', cryptoSchema);
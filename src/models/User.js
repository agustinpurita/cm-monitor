const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      required: true,
      unique: false,
    },
    apellido: {
      type: String,
      required: true,
      unique: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    contraseña: {
      type: String,
      required: true,
      unique: false,
    },
    moneda: {
        type: String,
        required: true,
        unique: false,
    }

  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);

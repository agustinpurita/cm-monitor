const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    lastname: {
      type: String,
      required: true,
      unique: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    currency: {
      type: String,
      required: true,
      unique: false,
    },
    favcryptos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Crypto',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);

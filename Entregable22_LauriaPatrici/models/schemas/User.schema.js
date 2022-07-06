const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: { type: String, required: true },
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },

  edad: { type: Number, required: true },
  phone: { type: Number, required: true },
  foto: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});
UserSchema.index({ email: 1 });
module.exports = UserSchema;

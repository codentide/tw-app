const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UniversidadSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de la universidad es requerido"],
    minlength: 1,
  },
  direccion: {
    type: String,
    required: [true, "La dirección de la universidad es requerida"]
  },
  telefono: {
    type: String,
    unique: true,
    required: [true, "El teléfono de la universidad es requerido"]
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaModificacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Universidad", UniversidadSchema);

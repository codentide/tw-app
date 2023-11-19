const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const EtapaSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de la etapa es requerido"],
    minlength: 1,
    unique: true,
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

module.exports = model("Etapa", EtapaSchema);

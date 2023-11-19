const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TipoProyectoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del tipo de proyecto es requerido"],
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

module.exports = model("TipoProyecto", TipoProyectoSchema);

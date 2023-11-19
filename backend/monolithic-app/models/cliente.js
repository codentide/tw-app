const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ClienteSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del cliente es requerido"],
    minlength: 1,
  },
  email: {
    type: String,
    required: [true, "El email del cliente es requerido"],
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

module.exports = model("Cliente", ClienteSchema);

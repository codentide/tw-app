const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProyectoSchema = new Schema({
  serial: {
    type: String,
    required: [true, "El serial es requerido"],
    unique: [true, "Este serial ya existe"],
  },
  titulo: {
    type: String,
    required: [true, "El título del proyecto es requerido"],
  },
  fechaInicio: {
    type: Date,
    required: [true, "La fecha de inicio es requerida"]
  },
  valor: {
    type: Number,
    required: [true, "El valor es requerido"],
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: "Cliente",
    required: [true, "El cliente es requerido"],
  },
  tipoProyecto: {
    type: Schema.Types.ObjectId,
    ref: "TipoProyecto",
    required: [true, "El tipo del proyecto es requerido"],
  },
  universidad: {
    type: Schema.Types.ObjectId,
    ref: "Universidad",
    required: [true, "La universidad es requerida"],
  },
  etapa:{
    type: Schema.Types.ObjectId,
    ref: "Etapa",
    required: [true, "La etapa es requerida"],
  },
  fechaEntrega:{
    type: Date,
    required: [true, "La fecha de entrega es requerida"]
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

module.exports = model("Proyecto", ProyectoSchema);

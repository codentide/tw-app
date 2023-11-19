const mongoose = require("mongoose");
const Proyecto = require("../models/proyecto");
const Cliente = require("../models/cliente");
const TipoProyecto = require("../models/tipoProyecto");
const Universidad = require("../models/universidad");
const Etapa = require("../models/etapa");
const { request, response } = require("express");

// POST - Crear proyecto
const createProyecto = async (req = request, res = response) => {
  const {
    serial,
    cliente,
    tipoProyecto,
    universidad,
    etapa,
    ...data
  } = req.body;

  try {
    const proyectoBD = await Proyecto.findOne({ serial });
    const clienteBD = await Cliente.findOne({ _id: cliente._id });
    const tipoProyectoBD = await TipoProyecto.findOne({ _id: req.body.tipoProyecto._id });
    const universidadBD = await Universidad.findOne({ _id: universidad._id });
    const etapaBD = await Etapa.findOne({ _id: etapa._id });

    if (proyectoBD) {
      return res
        .status(400)
        .json({ msj: `El proyecto con serial ${serial} ya existe` });
    }

    // Validar los otros datos
    if (!clienteBD) {
      return res
        .status(400)
        .json({ msj: `El cliente con id ${cliente._id} no fue encontrado` });
    }
    if (!tipoProyectoBD) {
      return res
        .status(400)
        .json({ msj: `El tipo de proyecto con id ${tipoProyecto._id} no fue encontrado` });
    }
    if (!universidadBD) {
      return res
        .status(400)
        .json({ msj: `La universidad con id ${universidad._id} no fue encontrada` });
    }
    if (!etapaBD) {
      return res
        .status(400)
        .json({ msj: `La etapa con id ${etapa._id} no fue encontrada` });
    }

    const proyecto = new Proyecto(req.body);

    await proyecto.save();

    return res.status(201).json(proyecto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error.message });
  }
};

// GET, Consultar todos los proyectos
const getProyectos = async (req = request, res = response) => {
  try {
    const proyectos = await Proyecto.find()
    .populate({
      path: "cliente",
      select: "nombre email"
    })
    .populate({
      path: "tipoProyecto",
      select: "nombre"
    })
    .populate({
      path: "universidad",
      select: "nombre"
    })
    .populate({
      path: "etapa",
      select: "nombre"
    })
    return res.status(200).json(proyectos);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error.message });
  }
};

// GET - Consultar proyecto por ObjectID
const getProyectoByID = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    const proyecto = await Proyecto.findById(id)
    .populate({
      path: "cliente",
      select: "nombre email"
    })
    .populate({
      path: "tipoProyecto",
      select: "nombre"
    })
    .populate({
      path: "universidad",
      select: "nombre"
    })
    .populate({
      path: "etapa",
      select: "nombre"
    });

    if (!proyecto) {
      return res.status(404).json({ msj: "Proyecto no encontrado" });
    }

    return res.status(200).json(proyecto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error.message });
  }
};

// PUT - Actualizar proyecto
const updateProyecto = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    const proyecto = await Proyecto.findById(id);

    if (!proyecto) {
      return res.status(404).json({ msj: "Proyecto no encontrado" });
    }

    // Validar campos referenciados si se proporcionan en la solicitud

    // Si se envía un dato en el body y este no existe, lanza un error
    if (req.body.cliente && !(await Cliente.findById(req.body.cliente._id))) {
      return res.status(400).json({ msj: `El cliente con id ${req.body.cliente._id} no existe` });
    }

    if (req.body.tipoProyecto && !(await TipoProyecto.findById(req.body.tipoProyecto._id))) {
      return res.status(400).json({ msj: `El tipo de proyecto con id ${req.body.tipoProyecto._id} no existe` });
    }

    if (req.body.universidad && !(await Universidad.findById(req.body.universidad._id))) {
      return res.status(400).json({ msj: `La universidad con id ${req.body.universidad._id} no existe` });
    }

    if (req.body.etapa && !(await Etapa.findById(req.body.etapa._id))) {
      return res.status(400).json({ msj: `La etapa con id ${req.body.etapa._id} no existe` });
    }

    // Actualizar campos
    proyecto.fechaModificacion = new Date();
    proyecto.serial = req.body.serial || proyecto.serial;
    proyecto.titulo = req.body.titulo || proyecto.titulo;
    proyecto.fechaInicio = req.body.fechaInicio || proyecto.fechaInicio;
    proyecto.valor = req.body.valor || proyecto.valor;
    proyecto.cliente = req.body.cliente || proyecto.cliente;
    proyecto.tipoProyecto = req.body.tipoProyecto || proyecto.tipoProyecto;
    proyecto.universidad = req.body.universidad || proyecto.universidad;
    proyecto.etapa = req.body.etapa || proyecto.etapa;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;

    await proyecto.save();

    return res.status(200).json(proyecto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error.message });
  }
};

// DELETE - Borrar proyecto
const deleteProyecto = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    const proyecto = await Proyecto.findByIdAndDelete(id);

    if (!proyecto) {
      return res.status(404).json({ msj: "Proyecto no encontrado" });
    }

    return res.status(200).json({ msj: "Proyecto eliminado con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error.message });
  }
};

module.exports = {
  createProyecto,
  getProyectos,
  getProyectoByID,
  updateProyecto,
  deleteProyecto,
};

const mongoose = require("mongoose");
const Etapa = require("../models/etapa");
const { request, response } = require("express");

// POST - Crear etapa

const createEtapa = async (req = request, res = response) => {
  // Extraer claves del body de la solicitud
  const { nombre } = req.body;

  try {
    // Buscar una etapa con el mismo valor en 'nombre'
    const etapaDB = await Etapa.findOne({ nombre });

    // Si este etapa existe, retornar un mensaje descriptivo
    if (etapaDB) {
      return res.status(400).json({ msj: "Ya existe una etapa con el mismo nombre" });
    }

    // Guardar los datos del body en una constante
    const datos = {
      nombre,
    };

    // Enviar dicha constante a un nuevo objeto etapa para instanciarlo
    const etapa = new Etapa(datos);

    await etapa.save();

    return res.status(201).json(etapa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

// GET - Consultar todas las etapas

const getEtapas = async (req = request, res = response) => {
  try {
    const etapas = await Etapa.find();
    return res.status(200).json(etapas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

// GET - Consultar etapa por ObjectID

const getEtapaByID = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    // Validar el ObjectID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    const etapa = await Etapa.findById(id);

    if (!etapa) {
      return res.status(404).json({ msj: "Etapa no encontrada" });
    }

    return res.status(200).json(etapa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

// PUT - Actualizar etapa

const updateEtapa = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    // Validar el ObjectID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    // Buscar el elemento con el id
    const etapa = await Etapa.findById(id);

    if (!etapa) {
      return res.status(404).json({ msj: "etapa no encontrada" });
    }

    // Actualizar la fecha de modificación y otros campos si se proporcionan
    etapa.fechaModificacion = Date.now();
    etapa.nombre = nombre || etapa.nombre;

    await etapa.save();

    return res.status(200).json(etapa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

// DELETE - Borrar etapa

const deleteEtapa = async (req, res) => {
  const { id } = req.params;

  try {
    // Validar el ObjectID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    const etapa = await Etapa.findByIdAndDelete(id);
    if (!etapa) {
      return res.status(404).json({ msj: "Etapa no encontrada" });
    } 

    return res.status(200).json({ msj: "Etapa eliminada con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

module.exports = {
  createEtapa,
  getEtapas,
  getEtapaByID,
  updateEtapa,
  deleteEtapa,
};

const mongoose = require("mongoose");
const TipoProyecto = require("../models/tipoProyecto");
const { request, response } = require("express");

// POST - Crear etapa
const createTipoProyecto = async (req = request, res = response) => {
  // Extraer claves del body de la solicitud
  const { nombre } = req.body;

  try {
    // Buscar una etapa con el mismo valor en 'nombre'
    const tipoProyectoDB = await TipoProyecto.findOne({ nombre });

    // Si este tipoProyecto existe, retornar un mensaje descriptivo
    if (tipoProyectoDB) {
      return res.status(400).json({ msj: "Ya existe una tipo de proyecto con el mismo nombre" });
    }

    // Guardar los datos del body en una constante
    const datos = {
      nombre,
    };

    // Enviar dicha constante a un nuevo objeto tipoProyecto para instanciarlo
    const tipoProyecto = new TipoProyecto(datos);

    await tipoProyecto.save();

    return res.status(201).json(tipoProyecto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

// GET - Consultar todas los tipos de proyectos
const getTipoProyectos = async (req = request, res = response) => {
  try {
    const tipoProyectos = await TipoProyecto.find();
    return res.status(200).json(tipoProyectos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

// GET - Consultar tipoProyecto por ObjectID
const getTipoProyectoByID = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    // Validar el ObjectID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    const tipoProyecto = await TipoProyecto.findById(id);

    if (!tipoProyecto) {
      return res.status(404).json({ msj: "Tipo de proyecto no encontrado" });
    }

    return res.status(200).json(tipoProyecto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

// PUT - Actualizar etapa

const updateTipoProyecto = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    // Validar el ObjectID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    // Buscar el elemento con el id
    const tipoProyecto = await TipoProyecto.findById(id);

    if (!tipoProyecto) {
      return res.status(404).json({ msj: "Tipo de proyecto no encontrado" });
    }

    // Actualizar la fecha de modificación y otros campos si se proporcionan
    tipoProyecto.fechaModificacion = Date.now();
    tipoProyecto.nombre = nombre || tipoProyecto.nombre;

    await tipoProyecto.save();

    return res.status(200).json(tipoProyecto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

// DELETE - Borrar etapa

const deleteTipoProyecto  = async (req, res) => {
  const { id } = req.params;

  try {
    // Validar el ObjectID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    const tipoProyecto = await TipoProyecto.findByIdAndDelete(id);
    if (!tipoProyecto) {
      return res.status(404).json({ msj: "Tipo de proyecto no encontrado" });
    } 

    return res.status(200).json({ msj: "Tipo de proyecto eliminada con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

module.exports = {
  createTipoProyecto,
  getTipoProyectos,
  getTipoProyectoByID,
  updateTipoProyecto,
  deleteTipoProyecto,
};

const mongoose = require("mongoose");
const Universidad = require("../models/universidad");
const { request, response } = require("express");

// POST - Crear universidad

const createUniversidad = async (req = request, res = response) => {
  // Extraer claves del body de la solicitud
  const { nombre, direccion, telefono } = req.body;

  try {
    // Buscar una universidad con el mismo valor en 'nombre'
    const universidadDB = await Universidad.findOne({ nombre });

    // Si esta universidad existe, retornar un mensaje descriptivo
    if (universidadDB) {
      return res.status(400).json({ msj: "Ya existe una universidad con el mismo nombre" });
    }

    // Guardar los datos del body en una constante
    const datos = {
      nombre, 
      direccion, 
      telefono,
    };

    // Enviar dicha constante a un nuevo objeto universidad para instanciarlo
    const universidad = new Universidad(datos);

    await universidad.save();

    return res.status(201).json(universidad);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

// GET - Consultar todas las universidades

const getUniversidades = async (req = request, res = response) => {
  try {
    const universidades = await Universidad.find();
    return res.status(200).json(universidades);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

// GET - Consultar etapa por ObjectID

const getUniversidadByID = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    // Validar el ObjectID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    const universidad = await Universidad.findById(id);

    if (!universidad) {
      return res.status(404).json({ msj: "Universidad no encontrada" });
    }

    return res.status(200).json(universidad);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

// PUT - Actualizar universidad

const updateUniversidad = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, direccion, telefono } = req.body;

  try {
    // Validar el ObjectID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    // Buscar el elemento con el id
    const universidad = await Universidad.findById(id);

    if (!universidad) {
      return res.status(404).json({ msj: "Universidad no encontrada" });
    }

    // Actualizar la fecha de modificación y otros campos si se proporcionan
    universidad.fechaModificacion = Date.now();
    universidad.nombre = nombre || universidad.nombre;
    universidad.direccion = direccion || universidad.direccion;
    universidad.telefono = telefono || universidad.telefono;

    await universidad.save();

    return res.status(200).json(universidad);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

// DELETE - Borrar universidad

const deleteUniversidad = async (req, res) => {
  const { id } = req.params;

  try {
    // Validar el ObjectID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    const universidad = await Universidad.findByIdAndDelete(id);
    if (!universidad) {
      return res.status(404).json({ msj: "Universidad no encontrada" });
    } 

    return res.status(200).json({ msj: "Universidad eliminada con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

module.exports = {
  createUniversidad,
  getUniversidades,
  getUniversidadByID,
  updateUniversidad,
  deleteUniversidad,
};

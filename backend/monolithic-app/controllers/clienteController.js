const mongoose = require("mongoose");
const Cliente = require("../models/cliente");
const { request, response } = require("express");

// POST - Crear cliente

const createCliente = async (req = request, res = response) => {
  // Extraer claves del body de la solicitud
  const { nombre, email } = req.body;

  try {
    // Buscar un cliente con el mismo valor en 'email'
    const clienteDB = await Cliente.findOne({ email });

    // Si este cliente existe, retornar un mensaje descriptivo
    if (clienteDB) {
      return res.status(400).json({ msj: "Ya existe un cliente con el mismo email" });
    }

    // Guardar los datos del body en una constante
    const datos = {
      nombre,
      email,
    };

    // Enviar dicha constante a un nuevo objeto cliente para instanciarlo
    const cliente = new Cliente(datos);

    await cliente.save(); 

    return res.status(201).json(cliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

// GET - Consultar todos los clientes

const getClientes = async (req = request, res = response) => {
  try {
    const clientes = await Cliente.find();

    if (clientes.length === 0){
      return res.status(400).json({msj: "No hay registros"})
    }

    return res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

// GET - Consultar cliente por ObjectID

const getClienteByID = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    // Validar el ObjectID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    const cliente = await Cliente.findById(id);

    if (!cliente) {
      return res.status(404).json({ msj: "Cliente no encontrado" });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

// PUT - Actualizar cliente

const updateCliente = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, email } = req.body;

  try {
    // Validar el ObjectID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    // Buscar el elemento con el id
    const cliente = await Cliente.findById(id);

    if (!cliente) {
      return res.status(404).json({ msj: "Cliente no encontrado" });
    }

    // Actualizar la fecha de modificación y otros campos si se proporcionan
    cliente.fechaModificacion = Date.now();
    cliente.nombre = nombre || cliente.nombre;
    cliente.email = email || cliente.email;

    await cliente.save();

    return res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

// DELETE - Borrar cliente

const deleteCliente = async (req, res) => {
  const { id } = req.params;

  try {
    // Validar el ObjectID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    const cliente = await Cliente.findByIdAndDelete(id);
    if (!cliente) {
      return res.status(404).json({ msj: "Cliente no encontrado" });
    } 

    return res.status(200).json({ msj: "Cliente eliminado con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

module.exports = {
  createCliente,
  getClientes,
  getClienteByID,
  updateCliente,
  deleteCliente,
};

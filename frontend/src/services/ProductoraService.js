import { axiosConfig } from "../config/axiosConfig";

// Función para obtener todos las productoras.
const getProductoras = () => {
  return axiosConfig.get("productoras/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Función para obtener un género por su ID.
const getProductoraById = (id) => {
  return axiosConfig.get("productoras/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Función para crear un nuevo género.
const createProductora = (data) => {
  return axiosConfig.post("productoras/", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Función para actualizar un género existente.
const updateProductora = (id, data) => {
  return axiosConfig.put("productoras/" + id, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Función para eliminar un género por su ID.
const deleteProductora = (id) => {
  return axiosConfig.delete("productoras/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export {
  getProductoras,
  getProductoraById,
  createProductora,
  updateProductora,
  deleteProductora,
};

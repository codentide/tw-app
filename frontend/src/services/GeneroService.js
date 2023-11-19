import { axiosConfig } from "../config/axiosConfig";

// Función para obtener todos los géneros.
const getGeneros = () => {
  return axiosConfig.get("generos/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Función para obtener un género por su ID.
const getGeneroById = (id) => {
  return axiosConfig.get("generos/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Función para crear un nuevo género.
const createGenero = (data) => {
  return axiosConfig.post("generos/", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Función para actualizar un género existente.
const updateGenero = (id, data) => {
  return axiosConfig.put("generos/" + id, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Función para eliminar un género por su ID.
const deleteGenero = (id) => {
  return axiosConfig.delete("generos/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { getGeneros, createGenero, updateGenero, deleteGenero };

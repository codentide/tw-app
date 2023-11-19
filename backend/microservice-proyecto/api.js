const express = require("express");
const dotenv = require("dotenv").config();
const { mongoConnection } = require("./database/configuration");
const cors = require('cors');

const proyectoRoute = require("./routes/proyectoRoute");

const api = express();

// Middleswares
api.use(express.urlencoded({ extended: false }))
api.use(express.json());

// Configurar CORS para permitir cualquier origen
api.use(cors());

// Conectar a la base de datos MongoDB
mongoConnection();

// Rutas
api.use("/api/v1/proyectos", proyectoRoute);

module.exports = api;

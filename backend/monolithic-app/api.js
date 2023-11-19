const express = require("express");
const dotenv = require("dotenv").config();
const { mongoConnection } = require("./database/configuration");
const cors = require('cors');

const clienteRoute = require("./routes/clienteRoute");
const etapaRoute = require("./routes/etapaRoute");
const tipoProyectoRoute = require("./routes/tipoProyectoRoute");
const universidadRoute = require("./routes/universidadRoute");


const api = express();

// Middleswares
api.use(express.urlencoded({ extended: false }))
api.use(express.json());

// Configurar CORS para permitir cualquier origen
api.use(cors());

// Conectar a la base de datos MongoDB
mongoConnection();

// Rutas
api.use("/api/v1/clientes", clienteRoute);
api.use("/api/v1/etapas", etapaRoute);
api.use("/api/v1/tipoproyectos", tipoProyectoRoute);
api.use("/api/v1/universidades", universidadRoute);

module.exports = api;

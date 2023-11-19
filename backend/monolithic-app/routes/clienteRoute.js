const { Router } = require("express");
const {
  createCliente,
  getClientes,
  getClienteByID,
  updateCliente,
  deleteCliente,
} = require("../controllers/clienteController");

const router = Router();

router.post("/", createCliente);
router.get("/", getClientes);
router.get("/:id", getClienteByID);
router.put("/:id", updateCliente);
router.delete("/:id", deleteCliente);

module.exports = router;

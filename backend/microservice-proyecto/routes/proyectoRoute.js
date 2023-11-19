const { Router } = require("express");
const {
  createProyecto,
  getProyectos,
  getProyectoByID,
  updateProyecto,
  deleteProyecto,
} = require("../controllers/proyectoController");

const router = Router();

router.post("/", createProyecto);
router.get("/", getProyectos);
router.get("/:id", getProyectoByID);
router.put("/:id", updateProyecto);
router.delete("/:id", deleteProyecto);

module.exports = router;

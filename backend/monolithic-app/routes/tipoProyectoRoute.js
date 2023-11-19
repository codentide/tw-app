const { Router } = require("express");
const {
  createTipoProyecto,
  getTipoProyectos,
  getTipoProyectoByID,
  updateTipoProyecto,
  deleteTipoProyecto,
} = require("../controllers/tipoProyectoController");

const router = Router();

router.post("/", createTipoProyecto);
router.get("/", getTipoProyectos);
router.get("/:id", getTipoProyectoByID);
router.put("/:id", updateTipoProyecto);
router.delete("/:id", deleteTipoProyecto);

module.exports = router;

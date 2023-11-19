const { Router } = require("express");
const {
  createUniversidad,
  getUniversidades,
  getUniversidadByID,
  updateUniversidad,
  deleteUniversidad,
} = require("../controllers/universidadController");

const router = Router();

router.post("/", createUniversidad);
router.get("/", getUniversidades);
router.get("/:id", getUniversidadByID);
router.put("/:id", updateUniversidad);
router.delete("/:id", deleteUniversidad);

module.exports = router;

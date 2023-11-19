const { Router } = require("express");
const {
  createEtapa,
  getEtapas,
  getEtapaByID,
  updateEtapa,
  deleteEtapa,
} = require("../controllers/etapaController");

const router = Router();

router.get("/", getEtapas);
router.get("/:id", getEtapaByID);
router.post("/", createEtapa);
router.put("/:id", updateEtapa);
router.delete("/:id", deleteEtapa);

module.exports = router;

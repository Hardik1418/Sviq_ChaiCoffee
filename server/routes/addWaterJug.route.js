const express = require("express");
const router = express.Router();
const {
  addWaterJug,
  addWaterJugData,
  waterJug,
} = require("../controllers/addWaterJug.controller");

router.get("/", waterJug);
router.get("/addWaterJug", addWaterJug);
router.post("/addWaterJug", addWaterJugData);

module.exports = router;

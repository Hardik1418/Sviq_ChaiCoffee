const express = require("express");
const router = express.Router();
const { getBill, getFilterBill } = require("../controllers/waterJugBill.controller");

router.get("/", getBill);
router.get("/filterbill", getFilterBill);

module.exports = router;

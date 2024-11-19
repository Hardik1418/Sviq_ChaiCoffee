const express = require("express");
const router = express.Router();
const {
  getBill,
  getFilterBill,
  generateBillPDF,
  updateBillController,
} = require("../controllers/bill.controller");

router.get("/:id", getBill);
router.get("/filterbill/:month&:id", getFilterBill);
router.get("/generate-pdf/:id", generateBillPDF);
router.patch("/updateBill/:id", updateBillController);

module.exports = router;

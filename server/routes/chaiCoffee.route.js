const express = require("express");
const router = express.Router();
const {
  addchaiCoffeeForm,
  addchaiCoffeeFormData,
  chaiCoffee,
} = require("../controllers/addChaiCoffee.controller");

router.get("/:id", chaiCoffee);
router.get("/addChaiCoffee", addchaiCoffeeForm);
router.post("/addChaiCoffee/:id", addchaiCoffeeFormData);

module.exports = router;

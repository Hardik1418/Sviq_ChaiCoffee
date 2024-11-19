const express = require("express");
const router = express.Router();
const merchantController = require("../controllers/merchant.controller");

// Create a new Merchant
router.post("/", merchantController.createMerchant);

// Update an existing Merchant by ID
router.put("/:id", merchantController.updateMerchant);

// Get a Merchant by ID
router.get("/:id", merchantController.getMerchantById);

// Get all Merchants
router.get("/", merchantController.getAllMerchants);

// Delete a Merchant by ID
router.delete("/:id", merchantController.deleteMerchant);

router.post("/login", merchantController.loginMerchant);

module.exports = router;

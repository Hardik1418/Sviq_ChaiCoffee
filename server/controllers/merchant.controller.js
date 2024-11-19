const merchantService = require("../service/merchant.service");

exports.createMerchant = async (req, res) => {
  try {
    const merchant = await merchantService.createMerchant(req.body);
    res.status(201).json({ success: true, data: merchant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMerchant = async (req, res) => {
  try {
    const merchant = await merchantService.updateMerchant(
      req.params.id,
      req.body
    );
    res.status(200).json({ success: true, data: merchant });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.getMerchantById = async (req, res) => {
  try {
    const merchant = await merchantService.getMerchantById(req.params.id);
    res.status(200).json({ success: true, data: merchant });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.getAllMerchants = async (req, res) => {
  try {
    const merchants = await merchantService.getAllMerchants();
    res.status(200).json({ success: true, data: merchants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteMerchant = async (req, res) => {
  try {
    const merchant = await merchantService.deleteMerchant(req.params.id);
    res.status(200).json({ success: true, data: merchant });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.loginMerchant = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const merchant = await merchantService.loginMerchant(username);

    // Check if the merchant exists
    if (!merchant) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Check if the password matches
    if (merchant.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password." });
    }

    // Successful login
    res
      .status(200)
      .json({ success: true, message: "Login successful.", data: merchant });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

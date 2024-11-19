const Merchant = require("../models/merchants.model");

const createMerchant = async (merchantData) => {
  try {
    const merchant = new Merchant(merchantData);
    return await merchant.save();
  } catch (error) {
    throw new Error(`Error creating merchant: ${error.message}`);
  }
};

const updateMerchant = async (merchantId, updateData) => {
  try {
    const merchant = await Merchant.findByIdAndUpdate(
      merchantId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!merchant) throw new Error("Merchant not found");
    return merchant;
  } catch (error) {
    throw new Error(`Error updating merchant: ${error.message}`);
  }
};

const getMerchantById = async (merchantId) => {
  try {
    const merchant = await Merchant.findById(merchantId);
    if (!merchant) throw new Error("Merchant not found");
    return merchant;
  } catch (error) {
    throw new Error(`Error retrieving merchant: ${error.message}`);
  }
};

const getAllMerchants = async () => {
  try {
    return await Merchant.find({});
  } catch (error) {
    throw new Error(`Error retrieving merchants: ${error.message}`);
  }
};

const deleteMerchant = async (merchantId) => {
  try {
    const merchant = await Merchant.findByIdAndDelete(merchantId);
    if (!merchant) throw new Error("Merchant not found");
    return merchant;
  } catch (error) {
    throw new Error(`Error deleting merchant: ${error.message}`);
  }
};
const loginMerchant = async (username) => {
  try {
    const merchant = await Merchant.findOne({ username });
    return merchant;
  } catch (error) {
    throw new Error(`Error finding merchant: ${error.message}`);
  }
};

module.exports = {
  createMerchant,
  updateMerchant,
  getMerchantById,
  getAllMerchants,
  deleteMerchant,
  loginMerchant,
};

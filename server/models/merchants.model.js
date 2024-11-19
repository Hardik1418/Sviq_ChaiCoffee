const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose); // Ensure the plugin is imported

const MerchantSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String, // Corrected type
    required: true,
    unique: true,
  },
  password: {
    type: String, // Corrected type
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

MerchantSchema.plugin(AutoIncrement, { inc_field: "merchant_id" });

const Merchant = mongoose.model("Merchant", MerchantSchema);

module.exports = Merchant;

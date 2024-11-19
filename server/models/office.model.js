const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const OfficeSchema = new mongoose.Schema({
  office_name: {
    type: String,
    required: true,
  },
  client_name: {
    type: String,
    required: true,
  },
  office_address: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  merchant_id: {
    type: String, // Reference to Merchant
    ref: "Merchant",
    required: true,
  },
});

OfficeSchema.plugin(AutoIncrement, { inc_field: "office_id" });

const Office = mongoose.model("Office", OfficeSchema);

module.exports = Office;

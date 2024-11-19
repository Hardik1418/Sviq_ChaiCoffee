const mongoose = require("mongoose");

const ChaiCoffeeSchema = new mongoose.Schema({
  chaiqty: {
    type: Number,
    required: true,
  },
  coffeeqty: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  session: {
    type: String,
    required: true,
  },
  totalamount: {
    type: Number,
    required: true,
  },
  office_id: {
    type: String, // Changed from ObjectId to Number (integer)
    ref: "Office", // Reference to Office model
    required: true,
  },
});

const ChaiCoffee = mongoose.model("ChaiCoffee", ChaiCoffeeSchema);

module.exports = ChaiCoffee;

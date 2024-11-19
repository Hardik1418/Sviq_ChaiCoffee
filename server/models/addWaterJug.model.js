const mongoose = require("mongoose");

const waterJugSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    session: {
      type: String,
      required: true,
      maxlength: 20,
    },
    date: {
      type: Date,
      required: true,
    },
    totalamount: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "WaterJug",
  }
);

const AddWaterJug = mongoose.model("AddWaterJug", waterJugSchema);

module.exports = AddWaterJug;
 
const WaterJug = require("../models/addWaterJug.model");

exports.addWaterJugData = async (data) => {
  try {
    const addWaterJug = new WaterJug(data);
    await addWaterJug.save();
    return addWaterJug;
  } catch (error) {
    console.error("Error adding waterJug:", error);
    throw error;
  }
};

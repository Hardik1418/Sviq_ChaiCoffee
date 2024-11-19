const ChaiCoffee = require("../models/addChaiCoffeeForm.model");

exports.addChaiCoffeeData = async (data) => {
  try {
    const addChaiCoffee = new ChaiCoffee(data);
    await addChaiCoffee.save();
    return addChaiCoffee;
  } catch (error) {
    console.error("Error adding chaiCoffee:", error);
    throw error;
  }
};

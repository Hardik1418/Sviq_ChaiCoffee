const Office = require("../models/office.model");

const getTotalOffices = async () => {
  try {
    // Count all documents in the Office collection
    const totalOffices = await Office.countDocuments();
    return totalOffices;
  } catch (error) {
    console.error("Error in getTotalOffices:", error.message);
    throw error;
  }
};

const getOffices = async (id) => {
  try {
    // Find all office documents in the collection
    const offices = await Office.find({ merchant_id: id }); // This retrieves all documents
    return offices;
  } catch (error) {
    console.error("Error in getOffices:", error.message);
    throw error;
  }
};
const createOffice = async (officeData) => {
  try {
    console.log("Data:", officeData);

    // Create a new office instance using the data provided
    const office = new Office(officeData);

    // Save the new office to the database
    await office.save();

    // Return a 200 status code with the created office document in the response
    return;
  } catch (error) {
    console.error("Error in createOffice:", error.message);
    return res.status(500).json({
      message: "An error occurred while creating the office",
      error: error.message,
    });
  }
};

module.exports = {
  getTotalOffices,
  createOffice,
  getOffices,
};

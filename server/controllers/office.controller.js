const officeService = require("../service/office.service");

async function createOffice(req, res) {
  try {
    // Get office data from the request body
    const officeData = req.body;
    console.log("createOffice controller:", officeData);

    // Call the createOffice service to create a new office
    const newOffice = await officeService.createOffice(officeData);

    // Send a response with the newly created office
    return res.status(201).json({
      success: true,
      message: "Office created successfully",
      office: newOffice,
    });
  } catch (error) {
    console.error("Error adding office:", error);
    throw error;
  }
}

async function getOffice(req, res) {
  try {
    const id = req.params.id;
    console.log("getOffice id:", id);

    // Fetch all offices using the officeService
    const offices = await officeService.getOffices(id); // No need to pass officeData here

    if (offices.length == 0) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json({
      success: true,
      message: "Offices retrieved successfully",
      offices: offices,
    });
  } catch (error) {
    console.error("Error finding offices:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving offices",
      error: error.message,
    });
  }
}
module.exports = {
  createOffice,
  getOffice,
};

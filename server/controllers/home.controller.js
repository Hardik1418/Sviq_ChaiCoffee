const { getTotalOffices } = require("../service/office.service");

/**
 * Sends the total number of offices as a JSON response.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function homePage(req, res) {
  try {
    // Fetch the total count of offices
    const totalOffices = await getTotalOffices();

    // Send the totalOffices as a JSON response
    return res.json({ totalOffices });
  } catch (error) {
    console.error("Error in homePage controller:", error.message);
    return res.status(500).json({ error: "Failed to fetch the total offices." });
  }
}

module.exports = {
  homePage,
};

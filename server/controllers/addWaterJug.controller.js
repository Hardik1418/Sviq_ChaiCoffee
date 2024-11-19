const AddWaterJug = require("../service/addWaterJug.service");
const GetWaterJugAndBill = require("../service/waterJug.service");

async function waterJug(req, res) {
  try {
    const totalJug = await GetWaterJugAndBill.getTotalJug();

    const totalBill = await GetWaterJugAndBill.getTotalBill();

    return res.render("waterJug", { totalJug, totalBill });
  } catch (error) {
    console.error("Error retrieving bills:", error);
    return res.status(500).send({
      message: "An error occurred while retrieving bills.",
    });
  }
}

function addWaterJug(req, res) {
  return res.render("addWaterJugForm");
}

async function addWaterJugData(req, res) {
  try {
    const { quantity, session, date } = req.body;

    const totalamount = quantity * 20;
    console.log("totalamount:", totalamount);

    const waterJugDetails = {
      quantity: quantity,
      session: session,
      date: date,
      totalamount: totalamount,
    };

    const result = await AddWaterJug.addWaterJugData(waterJugDetails);

    if (!result) {
      return res.status(500).send({
        message: "Failed to process data.",
      });
    }

    return res.redirect("/waterJug");
  } catch (error) {
    console.error("Error while processing data:", error);
    return res.status(500).send({
      message: "An error occurred while processing your request.",
    });
  }
}

module.exports = {
  addWaterJug,
  addWaterJugData,
  waterJug,
};

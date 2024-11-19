const Bill = require("../service/waterJugBill.service");

async function getBill(req, res) {
  try {
    const billData = await Bill.getbill();
    return res.render("waterJugBill", { bills: billData });
  } catch (error) {
    console.error("Error retrieving bills:", error);
    return res.status(500).send({
      message: "An error occurred while retrieving bills.",
    });
  }
}

async function getFilterBill(req, res) {
  try {
    const month = req.query.month;
    console.log("Month:", month);

    const billData = await Bill.getFilterBill(month);
    return res.render("waterJugBill", { bills: billData });
  } catch (error) {
    console.error("Error retrieving bills:", error);
    return res.status(500).send({
      message: "An error occurred while filter bills.",
    });
  }
}

module.exports = { getBill, getFilterBill };

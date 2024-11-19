const AddChaiCoffee = require("../service/addChaiCoffeeForm.service");
const GetchaiCoffeeAndBill = require("../service/chaiCoffee.service");

async function chaiCoffee(req, res) {
  try {
    const { id } = req.params; // Assuming the user ID is passed as a URL parameter

    const totalChai = await GetchaiCoffeeAndBill.getTotalChai(id);

    const totalCoffee = await GetchaiCoffeeAndBill.getTotalCoffee(id);

    const totalBill = await GetchaiCoffeeAndBill.getTotalBill(id);

    return res.json({ totalChai, totalCoffee, totalBill });
  } catch (error) {
    console.error("Error retrieving bills:", error);
    return res.status(500).send({
      message: "An error occurred while retrieving bills.",
    });
  }
}

function addchaiCoffeeForm(req, res) {
  return res.render("addChaiCoffeeForm");
}

async function addchaiCoffeeFormData(req, res) {
  try {
    const { id } = req.params;
    
    const { chai, coffee, session, date } = req.body;
    console.log(
      "chai, coffee, session, date, office_id",
      chai,
      coffee,
      session,
      date,
      id
    );

    const totalamount = chai * 10 + coffee * 20;
    console.log("totalamount:", totalamount);

    const chaiCoffeeDetails = {
      chaiqty: chai,
      coffeeqty: coffee,
      session: session,
      date: date,
      totalamount: totalamount,
      office_id: id,
    };

    const result = await AddChaiCoffee.addChaiCoffeeData(chaiCoffeeDetails);

    if (!result) {
      return res.status(500).send({
        message: "Failed to process data.",
      });
    }

    return res.json({
      message: "Chai Coffee data added successfully",
      data: chaiCoffeeDetails,
    });
  } catch (error) {
    console.error("Error while processing data:", error);
    return res.status(500).send({
      message: "An error occurred while processing your request.",
    });
  }
}

module.exports = {
  addchaiCoffeeForm,
  addchaiCoffeeFormData,
  chaiCoffee,
};

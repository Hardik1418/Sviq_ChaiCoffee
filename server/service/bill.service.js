const ChaiCoffee = require("../models/addChaiCoffeeForm.model");

exports.getBill = async (id) => {
  try {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    console.log("ID service:", id);

    if (isNaN(id)) {
      throw new Error("Invalid office_id: Must be an integer");
    }

    const bill = await ChaiCoffee.aggregate([
      {
        $addFields: {
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
      },
      {
        $match: {
          office_id: id, // Match the integer office_id
          month: month,
          year: year,
        },
      },
    ]);

    return bill;
  } catch (error) {
    console.error("Error retrieving bill:", error);
    throw error;
  }
};

exports.getFilterBill = async (month, id) => {
  try {
    const year = new Date().getFullYear();

    // Log the raw bills to check the date format
    await ChaiCoffee.find({});
    const bills = await ChaiCoffee.aggregate([
      {
        $addFields: {
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
      },
      {
        $match: {
          office_id: id,
          month: parseInt(month), // Ensure month is an integer
          year: year,
        },
      },
    ]);

    console.log("Filtered Bills:", bills); // Log filtered bills
    return bills;
  } catch (error) {
    console.error("Error retrieving filtered bills:", error);
    throw error;
  }
};

exports.updateBill = async (billData, id) => {
  try {
    const officeId = parseInt(id, 10); // Convert id to an integer

    return await ChaiCoffee.updateOne(
      { office_id: officeId }, // Use the converted integer id
      {
        $set: {
          // Use $set to specify the fields to update
          chaiqty: billData.chaiqty,
          coffeeqty: billData.coffeeqty,
          session: billData.session,
          totalamount: billData.totalamount,
        },
      }
    );
  } catch (error) {
    throw error; // Propagate the error for higher-level handling
  }
};

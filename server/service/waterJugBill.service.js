const WaterJug = require("../models/addWaterJug.model");

exports.getbill = async (req, res) => {
  try {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const bill = await WaterJug.aggregate([
      {
        $addFields: {
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
      },
      {
        $match: {
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

exports.getFilterBill = async (month) => {
  try {
    const year = new Date().getFullYear();

    const bills = await WaterJug.aggregate([
      {
        $addFields: {
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
      },
      {
        $match: {
          month: month,
          year: year,
        },
      },
    ]);

    return bills;
  } catch (error) {
    console.error("Error retrieving filtered bills:", error);
    throw error;
  }
};

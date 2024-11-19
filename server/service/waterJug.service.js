const WaterJug = require("../models/addWaterJug.model");
exports.getTotalJug = async (req, res) => {
  try {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const totalJug = await WaterJug.aggregate([
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
      {
        $group: {
          _id: null,
          total: { $sum: "$quantity" },
        },
      },
    ]);

    return totalJug[0]?.total || 0;
  } catch (error) {
    console.error("Error retrieving total jug:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTotalBill = async (req, res) => {
  try {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const totalBill = await WaterJug.aggregate([
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
      {
        $group: {
          _id: null,
          total: { $sum: "$totalamount" },
        },
      },
    ]);

    return totalBill[0]?.total || 0;
  } catch (error) {
    console.error("Error retrieving total bill:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

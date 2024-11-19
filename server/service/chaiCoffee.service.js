const ChaiCoffee = require("../models/addChaiCoffeeForm.model");

exports.getTotalChai = async (id) => {
  try {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    console.log("id ... :", id);

    const totalChai = await ChaiCoffee.aggregate([
      {
        $addFields: {
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
      },
      {
        $match: {
          office_id: id,
          month: month,
          year: year,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$chaiqty" },
        },
      },
    ]);

    return totalChai[0]?.total || 0;
  } catch (error) {
    console.error("Error retrieving total chai:", error);
  }
};

exports.getTotalCoffee = async (id) => {
  try {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const totalCoffee = await ChaiCoffee.aggregate([
      {
        $addFields: {
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
      },
      {
        $match: {
          office_id: id,
          month: month,
          year: year,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$coffeeqty" },
        },
      },
    ]);

    return totalCoffee[0]?.total || 0;
  } catch (error) {
    console.error("Error retrieving total coffee:", error);
  }
};

exports.getTotalBill = async (id) => {
  try {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const totalBill = await ChaiCoffee.aggregate([
      {
        $addFields: {
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
      },
      {
        $match: {
          office_id: id,
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
  }
};

const Bill = require("../service/bill.service");
const moment = require("moment");
const pdf = require("html-pdf"); // Import the html-pdf package

async function getBill(req, res) {
  try {
    const { id } = req.params;

    const billData = await Bill.getBill(id);
    console.log("billData:", billData);

    const data = billData.map((item) => ({
      ...item,
      date: moment(item.date).format("DD/MM/YYYY"),
    }));
    console.log(data);
    return res.json({ bills: data }); // Send the data as JSON
  } catch (error) {
    console.error("Error retrieving bills:", error);
    return res.status(500).json({
      message: "An error occurred while retrieving bills.",
    });
  }
}

async function getFilterBill(req, res) {
  try {
    const month = req.params.month;
    const id = req.params.id;

    console.log("Month:", month);
    console.log("id:", id);

    const billData = await Bill.getFilterBill(month, id);
    const data = billData.map((item) => ({
      ...item,
      date: moment(item.date).format("DD/MM/YYYY"),
    }));
    return res.json({ bills: data }); // Send the filtered bills as JSON
  } catch (error) {
    console.error("Error retrieving bills:", error);
    return res.status(500).json({
      message: "An error occurred while filtering bills.",
    });
  }
}

async function updateBillController(req, res) {
  try {
    const id = req.params.id;

    const totalamount = req.body.chaiqty * 10 + req.body.coffeeqty * 20;
    console.log("totalamount:", totalamount);

    const chaiCoffeeDetails = {
      chaiqty: req.body.chaiqty,
      coffeeqty: req.body.coffeeqty,
      session: req.body.session,
      date: req.body.date,
      totalamount: totalamount,
    };

    const updatedBill = await Bill.updateBill(chaiCoffeeDetails, id);
    console.log("UpdatedBill:", updatedBill);

    const billData = await Bill.getBill();
    const data = billData.map((item) => ({
      ...item,
      date: moment(item.date).format("DD/MM/YYYY"),
    }));
    return res.json({ bills: data }); // Send the updated bills as JSON
  } catch (error) {
    console.error("Error updating bills:", error);
    return res.status(500).json({
      message: "An error occurred while updating bills.",
    });
  }
}

async function generateBillPDF(req, res) {
  try {
    const id = req.params.id;
    const bills = await Bill.getBill(id);
    const data = bills.map((item) => ({
      ...item,
      date: moment(item.date).format("DD/MM/YYYY"),
    }));
    const totalBill = bills.reduce((sum, bill) => sum + bill.totalamount, 0);
    const totalChai = data.reduce((sum, bill) => sum + bill.chaiqty, 0);
    const totalCoffee = data.reduce((sum, bill) => sum + bill.coffeeqty, 0);

    console.log("data", data);

    const html = `
    <html>
  <head>
    <style>
      body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 10px;
        background-color: #f4f4f4;
        font-size: 14px;
      }
      .container {
        background-color: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 15px;
      }
      .logo img {
        max-width: 150px;
        max-height: 150px;
      }
      .company-info {
        text-align: right;
      }
      h3 {
        margin: 0;
        font-size: 16px;
        color: #333;
      }
      p {
        margin: 2px 0;
        font-size: 12px;
        color: #555;
      }
      h2 {
        text-align: center;
        color: #333;
        margin-bottom: 15px;
        font-size: 18px;
        border-bottom: 1px solid #4caf50;
        padding-bottom: 5px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
        font-size: 12px;
      }
      th {
        background-color: #4caf50;
        color: white;
        font-weight: bold;
      }
      td {
        background-color: #f9f9f9;
      }
      tr:nth-child(even) td {
        background-color: #f2f2f2;
      }
      tr:hover td {
        background-color: #e1f5fe;
      }
      .total {
        font-weight: bold;
        font-size: 16px;
        margin-top: 10px;
        text-align: center;
        color: black;
      }
      .footer {
        text-align: center;
        margin-top: 30px;
        font-size: 12px;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">
          <img src="http://localhost:2222/views/img/logo.png" alt="Company Logo">
        </div>
        <div class="company-info">
          <h3>SVIQ SOLUTION LLP</h3>
          <p>Third Floor 18, Samanvay Status II,</p>
          <p>Padra Road, Vadodara</p>
          <p>390012 India</p>
        </div>
      </div>
      <h2>Monthly Bill Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>No. of Chai</th>
            <th>No. of Coffee</th>
            <th>Session</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (bill) => `
          <tr>
            <td>${bill.date}</td>
            <td>${bill.chaiqty}</td>
            <td>${bill.coffeeqty}</td>
            <td>${bill.session}</td>
            <td>₹${bill.totalamount}</td>
          </tr>
          `
            )
            .join("")}
          <tr>
            <td class="total"><strong>Total:</strong></td>
            <td class="total"><strong>${totalChai}</strong></td>
            <td class="total"><strong>${totalCoffee}</strong></td>
            <td></td>
            <td class="total"><strong>₹${totalBill}</strong></td>
          </tr>
        </tbody>
      </table>
      <div class="footer">Thank you for your business!</div>
    </div>
  </body>
</html>

    `;

    const options = { format: "A4" };

    // Generate PDF using html-pdf
    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        console.error("Error generating PDF:", err);
        return res.status(500).send("Error generating PDF: " + err.message);
      }

      res.setHeader("Content-Type", "application/pdf");
      res.send(buffer);
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF: " + error.message);
  }
}

module.exports = {
  getBill,
  getFilterBill,
  generateBillPDF,
  updateBillController,
};

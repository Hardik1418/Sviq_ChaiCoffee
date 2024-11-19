const express = require("express");
const homeRouter = require("./routes/home.route");
const chaiCoffeeRouter = require("./routes/chaiCoffee.route");
const billRouter = require("./routes/bill.route");
const merchantRouter = require("./routes/merchant.route");
const connectDB = require("./db/dbconfig");
const path = require("path");
const cors = require("cors");
const officeRoutes = require("./routes/office.route"); // Import the office routes

const app = express();
const PORT = 2222;

connectDB;

app.set("view engine", "ejs");
app.use("/views", express.static(path.join(__dirname, "views")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", homeRouter);
app.use("/chaiCoffee", chaiCoffeeRouter);
app.use("/getBillChaiCoffee", billRouter);
app.use("/merchant", merchantRouter);

// Use office routes
app.use("/office", officeRoutes); // Prefix all office routes with '/api/offices'

app.listen(PORT, () => {
  console.log(`Server is started on PORT: http://localhost:${PORT}`);
});

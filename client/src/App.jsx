import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ChaiCoffee from "./pages/ChaiCoffee";
import AddChaiCoffee from "./pages/AddChaiCoffee"; // Import AddChaiCoffee
import Bill from "./pages/Bill";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home/:id" element={<HomePage />} />
        <Route path="/chaiCoffee/:id" element={<ChaiCoffee />} />
        <Route
          path="/chaiCoffee/addChaiCoffee/:id"
          element={<AddChaiCoffee />}
        />{" "}
        {/* Add this route */}
        <Route path="/getBillChaiCoffee/:id" element={<Bill />} />
      </Routes>
    </Router>
  );
};

export default App;

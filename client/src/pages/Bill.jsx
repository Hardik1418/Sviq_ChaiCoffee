import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getBill,
  updateBill,
  getFilterBill,
  generatePdf,
} from "../../services/chaiCoffee.service";
const BASE_URL = import.meta.env.VITE_BASE_URL; // Access VITE_BASE_URL from .env

const Bill = () => {
  const { id } = useParams();
  const [bills, setBills] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [totalBill, setTotalBill] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: "",
    date: "",
    chaiqty: "",
    coffeeqty: "",
    session: "",
  });

  useEffect(() => {
    getBill(id)
      .then((response) => {
        setBills(response.bills);
      })
      .catch((error) => {
        console.error("Error fetching bills:", error);
      });
  }, []);

  useEffect(() => {
    let total = 0;
    bills.forEach((bill) => {
      total += bill.totalamount;
    });
    setTotalBill(total);
  }, [bills]);

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);

    if (month) {
      getFilterBill(month, id)
        .then((response) => {
          setBills(response.bills);
          setTotalBill(
            response.bills.reduce((total, bill) => total + bill.totalamount, 0)
          );
        })
        .catch((error) => {
          console.error("Error fetching filtered bills:", error);
        });
    } else {
      getBill()
        .then((response) => {
          setBills(response.bills);
          setTotalBill(
            response.bills.reduce((total, bill) => total + bill.totalamount, 0)
          );
        })
        .catch((error) => {
          console.error("Error fetching bills:", error);
        });
    }
  };

  const handleEditFormOpen = (bill) => {
    setEditFormData({
      id: bill.id,
      date: bill.date,
      chaiqty: bill.chaiqty,
      coffeeqty: bill.coffeeqty,
      session: bill.session,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleGeneratePDF = async () => {
    try {
      const res = await generatePdf(id); // Replace this with your API call

      if (res) {
        console.log(res);

        // Create a Blob from the PDF data (assuming res.data contains the raw PDF string)
        const blob = new Blob([res], { type: "application/pdf" });
        console.log("blob:", blob);

        // Create a URL for the Blob and open it in a new tab
        if (blob) {
          const url = window.URL.createObjectURL(blob);
          console.log("url:", url);
          window.open(
            `${BASE_URL}/getBillChaiCoffee/generate-pdf/${id}`,
            "_blank"
          );
        }

        console.log("PDF generated successfully.");
      } else {
        console.error("No data received for the PDF.");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBill(editFormData, id)
      .then(() => {
        setBills(
          bills.map((bill) =>
            bill.id === editFormData.id ? editFormData : bill
          )
        );
        console.log("updated Success");
        const month =
          selectedMonth || editFormData.month || new Date().getMonth() + 1; // Default to current month if not found
        // setSelectedMonth(month);
        console.log("month:", month);

        getFilterBill(month, id)
          .then((response) => {
            setBills(response.bills);
            setTotalBill(
              response.bills.reduce(
                (total, bill) => total + bill.totalamount,
                0
              )
            );
          })
          .catch((error) => {
            console.error("Error fetching filtered bills:", error);
          });
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating bill:", error);
      });
  };

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat h-screen flex justify-center "
      style={{
        backgroundImage:
          "url('https://th.bing.com/th/id/R.502b31fbb431847eb4cf74fa90ec0827?rik=gYYYZWzWnwAWAA&riu=http%3a%2f%2fteafloor.com%2fblog%2fwp-content%2fuploads%2f2022%2f03%2fbest-indian-chai-tea.jpg&ehk=UhHQ7ki6KWpEIWIduhAi%2bp7AuFnuppNVjGhJJ8tbpAI%3d&risl=&pid=ImgRaw&r=0')",
      }}
    >
      <div className="overflow-y-auto relative max-w-3xl w-full bg-white bg-opacity-80 p-6 sm:p-8 rounded-xl shadow-lg border-t-4 border-green-600">
        <button
          className="absolute top-3 right-4 text-2xl text-gray-800 hover:text-red-500 focus:outline-none"
          onClick={() => (window.location.href = `/chaiCoffee/${id}`)}
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-xl sm:text-2xl text-center text-gray-800 mb-6 border-b-2 pb-2 border-green-600">
          Monthly Bill Summary
        </h2>

        {/* Filter by Month */}
        <div className="flex mb-6 flex-col sm:flex-row justify-between items-center">
          <select
            id="month"
            name="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="px-4 py-2 text-sm sm:text-lg border-2 border-green-600 rounded-md focus:outline-none focus:border-green-800 transition duration-300 mb-4 sm:mb-0"
          >
            <option value="">Select Month</option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Cards Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="bg-white p-6 rounded-lg shadow-md border border-green-600 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {bill.date}
              </h3>
              <p className="text-gray-700">
                <strong>No. of Chai: </strong>
                {bill.chaiqty}
              </p>
              <p className="text-gray-700">
                <strong>No. of Coffee: </strong>
                {bill.coffeeqty}
              </p>
              <p className="text-gray-700">
                <strong>Session: </strong>
                {bill.session}
              </p>
              <p className="text-gray-700 font-bold">
                <strong>Total Amount: </strong>₹{bill.totalamount}
              </p>
              <div className="mt-4 text-right">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm sm:text-lg hover:bg-blue-800"
                  onClick={() => handleEditFormOpen(bill)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section: Flex Layout for PDF and Total Bill */}
        <div className="flex justify-between items-center">
          {/* Generate PDF Button */}
          <button
            className="mb-6 px-4 py-2 text-sm sm:text-lg bg-green-700 text-white rounded-md hover:bg-green-900 transition duration-300"
            onClick={handleGeneratePDF}
          >
            Generate PDF
          </button>

          {/* Total Bill */}
          <div className="text-right text-sm sm:text-xl font-bold text-gray-800 mb-6">
            Total Bill: ₹{totalBill}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-7 w-75 max-w-lg">
              <h2 className="text-xl text-center font-bold text-gray-800 mb-4">
                Edit Bill
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="date"
                    className="block text-gray-800 text-sm sm:text-lg"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={editFormData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-sm sm:text-lg border-2 border-green-600 rounded-md focus:outline-none focus:border-green-800"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="chaiqty"
                    className="block text-gray-800 text-sm sm:text-lg"
                  >
                    No. of Chai
                  </label>
                  <input
                    type="number"
                    id="chaiqty"
                    name="chaiqty"
                    value={editFormData.chaiqty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-sm sm:text-lg border-2 border-green-600 rounded-md focus:outline-none focus:border-green-800"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="coffeeqty"
                    className="block text-gray-800 text-sm sm:text-lg"
                  >
                    No. of Coffee
                  </label>
                  <input
                    type="number"
                    id="coffeeqty"
                    name="coffeeqty"
                    value={editFormData.coffeeqty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-sm sm:text-lg border-2 border-green-600 rounded-md focus:outline-none focus:border-green-800"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="session"
                    className="block text-gray-800 text-sm sm:text-lg"
                  >
                    Session
                  </label>
                  <select
                    id="session"
                    name="session"
                    value={editFormData.session}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-sm sm:text-lg border-2 border-green-600 rounded-md focus:outline-none focus:border-green-800"
                  >
                    <option value="morning">Morning</option>
                    <option value="evening">Evening</option>
                    <option value="full day">Full Day</option>
                  </select>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-600 text-white rounded-md text-sm sm:text-lg"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md text-sm sm:text-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bill;

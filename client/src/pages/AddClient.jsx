import { useState } from "react";
import { addClient } from "../../services/client.service"; // Assume this function handles the API request

const AddClient = ({ setIsFormOpen, merchantId, setClients }) => {
  // States for the form data

  const [formData, setFormData] = useState({
    office_name: "",
    client_name: "",
    office_address: "",
    phone: "",
    merchant_id: merchantId,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { office_name, client_name, office_address, phone, merchant_id } =
      formData;

    // Validate that all fields are filled out
    if (office_name && client_name && office_address && phone && merchant_id) {
      try {
        // Send data to backend
        const response = await addClient(formData);

        if (response.status === 201) {
          // On success, add the client to the clients array (frontend state)
          setClients((prevClients) => [...prevClients, response.data]); // Assuming response.data is the new client
          setIsFormOpen(false); // Close the form after submission
          setFormData({
            office_name: "",
            client_name: "",
            office_address: "",
            phone: "",
          }); // Reset form fields
          alert("client created Successfully");
        } else {
          alert("Failed to add client");
        }
      } catch (error) {
        console.error("Error submitting client:", error);
        alert("There was an error submitting the form. Please try again.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:max-w-xs md:max-w-md lg:max-w-lg">
        <h2 className="text-2xl sm:text-xl font-bold text-gray-900 mb-4">
          Add New Client
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="client_name"
              className="block text-gray-700 font-medium mb-2 text-sm sm:text-base"
            >
              Client Name:
            </label>
            <input
              type="text"
              id="client_name"
              name="client_name"
              value={formData.client_name}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-indigo-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-700 text-gray-700 text-sm sm:text-base"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="office_name"
              className="block text-gray-700 font-medium mb-2 text-sm sm:text-base"
            >
              Office Name:
            </label>
            <input
              type="text"
              id="office_name"
              name="office_name"
              value={formData.office_name}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-indigo-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-700 text-gray-700 text-sm sm:text-base"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="office_address"
              className="block text-gray-700 font-medium mb-2 text-sm sm:text-base"
            >
              Office Address:
            </label>
            <input
              type="text"
              id="office_address"
              name="office_address"
              value={formData.office_address}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-indigo-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-700 text-gray-700 text-sm sm:text-base"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2 text-sm sm:text-base"
            >
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-indigo-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-700 text-gray-700 text-sm sm:text-base"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm sm:text-base"
            >
              Submit
            </button>
          </div>
        </form>
        <button
          onClick={() => setIsFormOpen(false)}
          className="mt-4 text-gray-500 hover:text-gray-700 underline text-sm sm:text-base"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddClient;

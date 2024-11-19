import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { getClient } from "../../services/client.service";
import AddClientModal from "./AddClient";

const HomePage = () => {
  const { id } = useParams();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedOfficeId, setSelectedOfficeId] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const navigate = useNavigate(); // Initialize the navigate hook

  // Fetch clients from the backend
  const fetchClients = async () => {
    try {
      const response = await getClient(id);
      if (response.success === true) {
        setClients(response.offices); // Assuming `offices` contains client data
      } else {
        console.error("Failed to fetch clients");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  // Fetch clients when the component mounts
  useEffect(() => {
    fetchClients();
  }, []);

  // Handle Add Client button click
  const handleAddClient = () => {
    setIsFormOpen(true);
  };

  // Handle Go button click
  const handleGoClick = () => {
    if (!selectedOfficeId) {
      console.log("No office selected");
      return;
    }

    // Redirect to ChaiCoffee page with the selected officeId
    navigate(`/chaiCoffee/${selectedOfficeId}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-900 to-indigo-600 text-white p-4"
      style={{
        backgroundImage: "url('/img/chai.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Status Card */}
      <div className="bg-white/80 shadow-2xl rounded-2xl p-6 w-full max-w-lg text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          Client Status
        </h1>
        <p className="text-lg text-gray-700">
          Total Clients: <span className="font-bold">{clients.length}</span>
        </p>
      </div>

      {/* Dropdown Container */}
      <div className="w-full max-w-lg bg-white/80 rounded-2xl shadow-xl p-6">
        <div className="flex items-center space-x-4">
          {/* Dropdown */}
          <select
            id="clientDropdown"
            value={selectedClient}
            onChange={(e) => {
              const client = clients.find(
                (c) => c.client_name === e.target.value
              );
              setSelectedClient(client?.client_name || "");
              setSelectedOfficeId(client?.office_id || "");
            }}
            className="w-2/3 p-2 border-2 border-indigo-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-700 text-gray-700"
          >
            <option value="" disabled>
              Select a Client
            </option>
            {clients.map((client, index) => (
              <option key={index} value={client.client_name}>
                {client.client_name} - {client.office_name}
              </option>
            ))}
          </select>

          {/* Go Button */}
          <button
            onClick={handleGoClick}
            className="mt-1 bg-green-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-5 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Go
          </button>
        </div>
      </div>

      {/* Add Client Button */}
      <button
        onClick={handleAddClient}
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
      >
        Add New Client
      </button>

      {/* Add Client Modal */}
      {isFormOpen && (
        <AddClientModal
          setIsFormOpen={setIsFormOpen}
          merchantId={id}
          setClients={() => {
            fetchClients(); // Re-fetch the clients dynamically
            setIsFormOpen(false); // Close the modal
          }}
        />
      )}
    </div>
  );
};

export default HomePage;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addChaiCoffee } from "../../services/chaiCoffee.service";

const AddChaiCoffee = () => {
  const { id } = useParams();

  const [chai, setChai] = useState(0); // Initialize chai count
  const [coffee, setCoffee] = useState(0); // Initialize coffee count
  const [session, setSession] = useState("full day"); // Default session to "Full Day"
  const [date, setDate] = useState(""); // Date state

  // Set current date as default when component mounts
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        chai,
        coffee,
        session,
        date,
      };
      console.log("Data of form:", data);

      const response = await addChaiCoffee(id, data);
      if (response.statusText === "OK") {
        alert("Chai & Coffee added successfully!");

        // Reset form fields
        setChai(0);
        setCoffee(0);
        setSession("full day");
        const today = new Date().toISOString().split("T")[0];
        setDate(today);
      } else {
        alert("Failed to add Chai & Coffee");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClose = () => {
    window.location.href = `/chaiCoffee/${id}`; // Redirect to the Chai-Coffee page
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url(https://th.bing.com/th/id/R.502b31fbb431847eb4cf74fa90ec0827?rik=gYYYZWzWnwAWAA&riu=http%3a%2f%2fteafloor.com%2fblog%2fwp-content%2fuploads%2f2022%2f03%2fbest-indian-chai-tea.jpg&ehk=UhHQ7ki6KWpEIWIduhAi%2bp7AuFnuppNVjGhJJ8tbpAI%3d&risl=&pid=ImgRaw&r=0)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">
          Add Chai & Coffee
        </h2>

        {/* Chai Counter */}
        <label htmlFor="chai" className="block text-gray-600 font-bold mb-2">
          Chai (Number of cups):
        </label>
        <div className="flex items-center justify-between mb-4 bg-gray-100 rounded-md p-2">
          <button
            type="button"
            onClick={() => setChai((prev) => Math.max(prev - 1, 0))}
            className="bg-red-500 text-white font-bold rounded-md px-3 py-2 hover:bg-red-600"
          >
            -
          </button>
          <span className="text-xl font-bold text-gray-700">{chai}</span>
          <button
            type="button"
            onClick={() => setChai((prev) => prev + 1)}
            className="bg-green-500 text-white font-bold rounded-md px-3 py-2 hover:bg-green-600"
          >
            +
          </button>
        </div>

        {/* Coffee Counter */}
        <label htmlFor="coffee" className="block text-gray-600 font-bold mb-2">
          Coffee (Number of cups):
        </label>
        <div className="flex items-center justify-between mb-4 bg-gray-100 rounded-md p-2">
          <button
            type="button"
            onClick={() => setCoffee((prev) => Math.max(prev - 1, 0))}
            className="bg-red-500 text-white font-bold rounded-md px-3 py-2 hover:bg-red-600"
          >
            -
          </button>
          <span className="text-xl font-bold text-gray-700">{coffee}</span>
          <button
            type="button"
            onClick={() => setCoffee((prev) => prev + 1)}
            className="bg-green-500 text-white font-bold rounded-md px-3 py-2 hover:bg-green-600"
          >
            +
          </button>
        </div>

        {/* Session Dropdown */}
        <label htmlFor="session" className="block text-gray-600 font-bold">
          Session:
        </label>
        <select
          id="session"
          name="session"
          value={session}
          onChange={(e) => setSession(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="morning">Morning</option>
          <option value="evening">Evening</option>
          <option value="full day">Full Day</option>
        </select>

        {/* Date Input */}
        <label htmlFor="date" className="block text-gray-600 font-bold">
          Select Date:
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-6"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 mb-4 transition-transform duration-300 transform hover:scale-105"
        >
          Submit
        </button>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-transform duration-300 transform hover:scale-105"
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default AddChaiCoffee;

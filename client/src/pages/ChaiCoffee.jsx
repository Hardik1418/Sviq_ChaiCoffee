import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Button from "../components/Button";
import StatsCard from "../components/StatsCard";
import { getChaiCoffeeById } from "../../services/chaiCoffee.service";

const ChaiCoffee = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to handle navigation
  const [totals, setTotals] = useState({
    totalChai: 0,
    totalCoffee: 0,
    totalBill: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch totals from backend
  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const response = await getChaiCoffeeById(id);
        console.log(response); // Log the response data
        setTotals(response);
      } catch (error) {
        console.error("Error fetching totals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTotals();
  }, [id]);

  return (
    <div
      className="flex flex-col justify-between items-center h-screen bg-cover bg-center p-6 lg:p-12"
      style={{
        backgroundImage:
          "url(https://th.bing.com/th/id/R.502b31fbb431847eb4cf74fa90ec0827?rik=gYYYZWzWnwAWAA&riu=http%3a%2f%2fteafloor.com%2fblog%2fwp-content%2fuploads%2f2022%2f03%2fbest-indian-chai-tea.jpg&ehk=UhHQ7ki6KWpEIWIduhAi%2bp7AuFnuppNVjGhJJ8tbpAI%3d&risl=&pid=ImgRaw&r=0)",
      }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center w-full mb-6 px-4 lg:px-8">
        {/* Back Button */}
        {/* <button onClick={() => navigate(-1)} className="mr-4">
          <img
            src="/client/public/img/home.png" // URL to your back arrow image
            alt="Back"
            className="w-8 h-8 lg:w-10 lg:h-10"
          />
        </button> */}

        {/* Title */}
        <h1 className="text-3xl lg:text-5xl font-bold text-yellow-400 text-center flex-grow">
          SVIQ Chai Wala
        </h1>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center items-center mb-6 lg:gap-8 lg:max-w-3xl">
        {loading ? (
          <div className="text-white text-lg lg:text-xl">Loading...</div>
        ) : (
          <>
            <StatsCard
              title="Total Chai"
              value={totals.totalChai}
              className="w-28 sm:w-36 lg:w-48 p-4 text-sm sm:text-lg lg:text-xl"
            />
            <StatsCard
              title="Total Coffee"
              value={totals.totalCoffee}
              className="w-28 sm:w-36 lg:w-48 p-4 text-sm sm:text-lg lg:text-xl"
            />
            <StatsCard
              title="Total Bill"
              value={`₹${totals.totalBill}`}
              className="w-28 sm:w-36 lg:w-48 p-4 text-sm sm:text-lg lg:text-xl"
            />
          </>
        )}
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl justify-center items-center lg:max-w-4xl lg:gap-6">
        <Button
          link={`/chaiCoffee/addChaiCoffee/${id}`}
          color="orange"
          text="Add Chai Coffee"
          className="w-full sm:w-48 lg:w-60 px-6 py-3 text-lg lg:text-xl text-center"
        />
        <Button
          link={`/getBillChaiCoffee/${id}`}
          color="green"
          text="Bill of Chai-Coffee"
          className="w-full sm:w-48 lg:w-60 px-6 py-3 text-lg lg:text-xl text-center"
        />
      </div>
    </div>
  );
};

export default ChaiCoffee;

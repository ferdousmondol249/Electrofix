//import  { useEffect, useState } from "react";

const OutletPage = () => {
//   const [outlets, setOutlets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetching outlets from the backend
//   useEffect(() => {
//     const fetchOutlets = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/outlets"); // Update the API endpoint as needed
//         const data = await response.json();
//         setOutlets(data);
//       } catch (error) {
//         console.error("Failed to fetch outlets:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchOutlets();
//   }, []);


   const outlets=[
    {
        id: 1,
        name: "Outlet 1",
        location: "Location 1"
    },
    {
        id: 2,
        name: "Outlet 2",
        location: "Location 2"
    },
    {
        id: 3,
        name: "Outlet 3",
        location: "Location 3"
    }
   ];


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Outlets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outlets.map((outlet) => (
          <div
            key={outlet.id}
            className="p-4 border rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{outlet.name}</h2>
            <p className="text-gray-600">Location: {outlet.location}</p>
            <button
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => window.alert(`Outlet ID: ${outlet.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutletPage;

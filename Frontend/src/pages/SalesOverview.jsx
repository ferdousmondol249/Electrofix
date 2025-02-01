import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesOverview = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesOverview = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/admin/sales-overview", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch sales overview");
        }

        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesOverview();
  }, []);

  // Bar chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      bar: {
        barThickness: 20, // Adjust this value to make the bars thinner or thicker
      },
    },
  };

  // Prepare data for the chart
  const chartData = salesData.length > 0 ? {
    labels: salesData.map((item) => item._id), // Use date as labels
    datasets: [
      {
        label: "Total Sales",
        data: salesData.map((item) => item.totalSales),
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Light blue
        borderColor: "rgba(54, 162, 235, 1)", // Darker blue for border
        borderWidth: 1,
      },
    ],
  } : {};

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      {loading ? (
        <div className="text-center text-gray-500">Loading sales data...</div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold">Sales Overview</h2>
          {salesData?.length > 0 ? (
            <div className="mt-4">
              <Bar data={chartData} options={options} />
            </div>
          ) : (
            <div className="mt-4 text-center text-gray-500">No sales data available.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SalesOverview;

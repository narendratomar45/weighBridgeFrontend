import { useContext,  useState } from "react";
import { WeighContext } from "../../Context/ContextProvider";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SelectWeighBridge = () => {
  const { getIncome, getExpense } = useContext(WeighContext);
  const [selectedLocation, setSelectedLocation] = useState("");

  const allLocations = [
    ...new Set([
      ...getIncome.map((item) => item.location),
      ...getExpense.map((item) => item.location),
    ]),
  ];

  const filteredIncome = getIncome.filter(
    (item) => item.location === selectedLocation
  );

  const filteredExpense = getExpense.filter(
    (item) => item.location === selectedLocation
  );

  const allDates = [
    ...new Set(
      [...filteredIncome, ...filteredExpense].map(
        (item) => item.transactionTime?.split("T")[0]
      )
    ),
  ];

  const incomeData = allDates.map(
    (date) =>
      filteredIncome.find(
        (item) => item.transactionTime?.split("T")[0] === date
      )?.totalIncome || 0
  );
  const expenseData = allDates.map(
    (date) =>
      filteredExpense.find(
        (item) => item.transactionTime?.split("T")[0] === date
      )?.totalIncome || 0
  );

  const chartData = {
    labels: allDates,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(0, 90, 180, 0.8)", // Darker Blue
        borderColor: "rgba(0, 60, 130, 1)", // Even Darker Border
        borderWidth: 1,
      },

      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <>
      <div className="p-6 ml-60">
        <div className="w-[500px] bg-gray-200 shadow-md rounded-lg p-5">
          <label
            htmlFor="weighBridgeSelect"
            className="block text-lg font-medium text-gray-800 mb-2"
          >
            Select WeighBridge
          </label>
          <select
            id="weighBridgeSelect"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            {allLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {selectedLocation && (
          <div className="bg-gray-200 shadow-md rounded-lg p-5 mt-6">
            <p className="text-lg font-semibold text-blue-600">
              Selected City: {selectedLocation}
            </p>

            <div className="w-full h-80 mt-4">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        )}

        {selectedLocation &&
          filteredIncome.length === 0 &&
          filteredExpense.length === 0 && (
            <p className="text-red-600 text-center font-medium mt-6">
              No income or expense data available for this location.
            </p>
          )}
      </div>
    </>
  );
};

export default SelectWeighBridge;

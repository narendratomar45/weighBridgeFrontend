import { useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { WeighContext } from "../../Context/ContextProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { getExpense, getIncome } = useContext(WeighContext);

  const userRole = localStorage.getItem("weighBridgeRole");
  const userLocation = localStorage.getItem("WeighBridgeLocation");

  const filteredIncome =
    userRole === "Branch Manager"
      ? getIncome.filter((item) => item.location === userLocation)
      : getIncome;

  const filteredExpense =
    userRole === "Branch Manager"
      ? getExpense.filter((item) => item.location === userLocation)
      : getIncome;

  const dailyExpense = filteredExpense.reduce((acc, expenseData) => {
    const date = new Date(expenseData.createdAt).toLocaleDateString("en-GB");
    acc[date] = (acc[date] || 0) + expenseData.amount;
    return acc;
  }, {});

  const dailyIncome = filteredIncome.reduce((acc, incomeData) => {
    const date = new Date(incomeData.createdAt).toLocaleDateString("en-GB");
    acc[date] = (acc[date] || 0) + incomeData.totalIncome;
    return acc;
  }, {});

  const dailyExpenseLabels = Object.keys(dailyExpense);
  const dailyExpenseValues = Object.values(dailyExpense);

  const dailyIncomeLabels = Object.keys(dailyIncome);
  const dailyIncomeValues = Object.values(dailyIncome);

  const monthlyExpense = filteredExpense.reduce((acc, expenseData) => {
    const date = new Date(expenseData.createdAt);
    const month = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    acc[month] = (acc[month] || 0) + expenseData.amount;
    return acc;
  }, {});

  const monthlyIncome = filteredIncome.reduce((acc, incomeData) => {
    const date = new Date(incomeData.createdAt);
    const month = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    acc[month] = (acc[month] || 0) + incomeData.totalIncome;
    return acc;
  }, {});

  const monthlyExpenseLabels = Object.keys(monthlyExpense);
  const monthlyExpenseValues = Object.values(monthlyExpense);

  const monthlyIncomeLabels = Object.keys(monthlyIncome);
  const monthlyIncomeValues = Object.values(monthlyIncome);

  const getDailyExpenseColor = (value) => {
    if (value > 1000) return "rgba(255, 0, 0, 0.7)";
    if (value > 500) return "rgba(255, 165, 0, 0.7)";
    return "rgba(34, 139, 34, 0.7)";
  };

  const getDailyColor = (value) => {
    if (value > 10000) return "rgba(0, 128, 0, 0.9)";
    if (value > 5000) return "rgba(255, 165, 0, 0.9)";
    return "rgba(139, 0, 0, 0.9)";
  };

  const getMonthlyExpenseColor = (value) => {
    if (value > 50000) return "rgba(0, 0, 139, 0.7)";
    if (value > 25000) return "rgba(30, 144, 255, 0.7)";
    return "rgba(135, 206, 235, 0.7)";
  };

  const getMonthlyColor = (value) => {
    if (value > 50000) return "rgba(0, 0, 139, 0.7)";
    if (value > 25000) return "rgba(30, 144, 255, 0.7)";
    return "rgba(70, 130, 180, 0.7)";
  };

  const dailyExpenseData = {
    labels: dailyExpenseLabels,
    datasets: [
      {
        label: "Daily Expense (Rs.)",
        data: dailyExpenseValues,
        backgroundColor: dailyExpenseValues.map((value) =>
          getDailyExpenseColor(value)
        ),
        borderColor: dailyExpenseValues.map((value) =>
          getDailyExpenseColor(value)
        ),
        borderWidth: 1,
      },
    ],
  };

  const dailyIncomeData = {
    labels: dailyIncomeLabels,
    datasets: [
      {
        label: "Daily Income (Rs.)",
        data: dailyIncomeValues,
        backgroundColor: dailyIncomeValues.map((value) => getDailyColor(value)),
        borderColor: dailyIncomeValues.map((value) => getDailyColor(value)),
        borderWidth: 1,
      },
    ],
  };

  const monthlyExpenseData = {
    labels: monthlyExpenseLabels,
    datasets: [
      {
        label: "Monthly Expense (Rs.)",
        data: monthlyExpenseValues,
        backgroundColor: monthlyExpenseValues.map((value) =>
          getMonthlyExpenseColor(value)
        ),
        borderColor: monthlyExpenseValues.map((value) =>
          getMonthlyExpenseColor(value)
        ),
        borderWidth: 1,
      },
    ],
  };

  const monthlyIncomeData = {
    labels: monthlyIncomeLabels,
    datasets: [
      {
        label: "Monthly Income (Rs.)",
        data: monthlyIncomeValues,
        backgroundColor: monthlyIncomeValues.map((value) =>
          getMonthlyColor(value)
        ),
        borderColor: monthlyIncomeValues.map((value) => getMonthlyColor(value)),
        borderWidth: 1,
      },
    ],
  };

  const expenseOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Expense Chart", font: { size: 18 } },
    },
  };

  const incomeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Income Chart",font: { size: 18 } },
    },
  };

  return (
    <div className="mt-10 w-full max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
        Transaction Chart
      </h2>

      <div className=" flex gap-10   ">
        <div className="p-6 bg-gray-200  shadow-xl rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-gray-700 text-center mb-5">
            Daily Income
          </h3>
          <div className="h-60 w-[400px] ">
            <Bar data={dailyIncomeData} options={incomeOptions} />
          </div>
        </div>

        <div className="p-6 bg-gray-200  shadow-xl rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-gray-700 text-center mb-5">
            Monthly Income
          </h3>
          <div className="h-60 w-[400px]">
            <Bar data={monthlyIncomeData} options={incomeOptions} />
          </div>
        </div>
      </div>

      <div className="flex gap-10 mt-10">
        <div className="p-6 h-full  bg-gray-200  shadow-xl rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-gray-700 text-center mb-5">
            Daily Expense
          </h3>
          <div className="h-60 w-[400px]">
            <Bar data={dailyExpenseData} options={expenseOptions} />
          </div>
        </div>

        <div className="p-6 h-full  bg-gray-200  shadow-xl rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-gray-700 text-center mb-5">
            Monthly Expense
          </h3>
          <div className="h-60 w-[400px]">
            <Bar data={monthlyExpenseData} options={expenseOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

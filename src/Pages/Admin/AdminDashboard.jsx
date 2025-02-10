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

const AdminDashboard = () => {
  const { getExpense, getIncome } = useContext(WeighContext);

  const dailyExpense = getExpense.reduce((acc, expenseData) => {
    const date = new Date(expenseData.createdAt).toLocaleDateString("en-GB");
    acc[date] = (acc[date] || 0) + expenseData.amount;
    return acc;
  }, {});

  const dailyIncome = getIncome.reduce((acc, incomeData) => {
    const date = new Date(incomeData.createdAt).toLocaleDateString("en-GB");
    acc[date] = (acc[date] || 0) + incomeData.totalIncome;
    return acc;
  }, {});

  const dailyExpenseLabels = Object.keys(dailyExpense);
  const dailyExpenseValues = Object.values(dailyExpense);

  const dailyIncomeLabels = Object.keys(dailyIncome);
  const dailyIncomeValues = Object.values(dailyIncome);

  const monthlyExpense = getExpense.reduce((acc, expenseData) => {
    const date = new Date(expenseData.createdAt);
    const month = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    acc[month] = (acc[month] || 0) + expenseData.amount;
    return acc;
  }, {});

  const monthlyIncome = getIncome.reduce((acc, incomeData) => {
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
    if (value > 20000) return "rgba(0, 0, 139, 0.7)";
    if (value > 5000) return "rgba(30, 144, 255, 0.7)";
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
      title: { display: true, text: "Income Chart" },
    },
  };

  return (
    <div className="mt-10 w-full max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
        Transaction Charts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-gray-200 backdrop-blur-md shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">
            Daily Income
          </h3>
          <div className="h-60">
            <Bar data={dailyIncomeData} options={incomeOptions} />
          </div>
        </div>

        <div className="p-6 bg-gray-200 backdrop-blur-md shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">
            Monthly Income
          </h3>
          <div className="h-60">
            <Bar data={monthlyIncomeData} options={incomeOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="p-6 bg-gray-200 backdrop-blur-md shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">
            Daily Expense
          </h3>
          <div className="h-60">
            <Bar data={dailyExpenseData} options={expenseOptions} />
          </div>
        </div>

        <div className="p-6 bg-gray-200 backdrop-blur-md shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">
            Monthly Expense
          </h3>
          <div className="h-60">
            <Bar data={monthlyExpenseData} options={expenseOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

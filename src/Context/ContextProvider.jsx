import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const WeighContext = createContext();
const ContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [getIncome, setGetIncome] = useState(null);
  const [getExpense, setGetExpense] = useState([]);
  const [error, setError] = useState(null);

  const signup = async (
    username,
    weighBridgeLocation,
    email,
    password,
    role,
    weighBridgeName,
    contactNumber
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup",
        {
          username,
          weighBridgeLocation,
          email,
          password,
          role,
          weighBridgeName,
          contactNumber,
        }
      );
      console.log("ResponseUser", response?.data?.user);
      setUser(response.data.user);
      setError(null);
    } catch (error) {
      console.log("Signup Error", error?.response?.data?.message);
      setError(error.response.data.message);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password }
      );
      console.log("Response", response.data);

      setUser(response?.data?.user);
      console.log("UserLogin", response?.data?.user);

      setError(null);
      localStorage.setItem("WeighBridgeToken", response?.data?.token);
      localStorage.setItem("weighBridgeRole", response?.data?.user?.role);
      localStorage.setItem("username", response?.data?.user?.username);
      localStorage.setItem(
        "contactNumber",
        response?.data?.user?.contactNumber
      );
      localStorage.setItem(
        "WeighBridgeLocation",
        response?.data?.user?.weighBridgeLocation
      );
      localStorage.setItem(
        "weighBridgeName",
        response?.data?.user?.weighBridgeName
      );
    } catch (error) {
      console.log("Login Error", error?.response?.data?.message);
      setError(error?.response?.data?.message);
    }
  };

  const incomeData = async (
    // weighBridge,
    location,
    vehicleNumber,
    weight,
    ratePerKg,
    totalIncome,
    totalExpenses,
    transactionTime
  ) => {
    try {
      const response = await axios.post("http://localhost:8000/api/income", {
        // weighBridge,
        location,
        vehicleNumber,
        weight,
        ratePerKg,
        totalIncome,
        totalExpenses,
        transactionTime,
      });
      setUser(response?.data);
      return response?.data;
    } catch (error) {
      console.log("Income Error", error?.response?.data?.message);
      setError(error?.response?.data?.message);
    }
  };
  const expenseData = async (expenseData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/expense",
        expenseData
      );
      // console.log("ExpenseProvider", response?.data);
      console.log("ID", response?.data?.expense?.weighBridge?._id);
      console.log("ID", response?.data?.expense?.assigneduser?._id);

      setUser(response?.data);
      return response?.data;
    } catch (error) {
      console.error("Expense Error:", error?.response?.data?.message);
      setError(error?.response?.data?.message || "An error occurred");
    }
  };

  const fetchIncome = async () => {
    const response = await axios.get("http://localhost:8000/api/income");
    // console.log("GetIncomeResponse", response.data);
    setGetIncome(response?.data?.income);
  };

  const fetchExpense = async () => {
    const response = await axios.get("http://localhost:8000/api/expense");
    // console.log("GetExpenseResponse", response.data);
    setGetExpense(response?.data?.expense);
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      const data = await response?.data;
      setUser(data);
      // console.log("AllData", data?.users);
    } catch (error) {
      console.log(error?.response?.data?.message);

      setError(error?.response?.data?.message);
    }
  };

  const getUserProfile = async () => {
    try {
      // const token = localStorage.getItem("WeighBridgeToken");
      const response = axios
        .get("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("WeighBridgeToken")}`,
          },
        })
        .then((res) => {
          setUser(res.data.user);
        });
      return response.data;
    } catch (error) {
      console.log("Error occured in profile", error?.response?.data?.message);
      setError(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchIncome();
    fetchExpense();
    getAllUsers();
    getUserProfile();
  }, []);

  return (
    <WeighContext.Provider
      value={{
        signup,
        login,
        error,
        user,
        incomeData,
        expenseData,
        getIncome,
        getExpense,
      }}
    >
      {children}
    </WeighContext.Provider>
  );
};

export default ContextProvider;

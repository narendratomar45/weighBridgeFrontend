import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./Components/Loading";
import Login from "./Pages/Auth/Login.jsx";
import BranchManager from "./Pages/BranchManager/BranchManager.jsx";
import Profile from "./Pages/BranchManager/Profile.jsx";
import Income from "./Pages/BranchManager/Income.jsx";
import Expense from "./Pages/BranchManager/Expense.jsx";
import Dashboard from "./Pages/BranchManager/Dashboard.jsx";
import Header from "./Components/Header.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Admin from "./Pages/Admin/Admin.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import SelectWeighBridge from "./Pages/Admin/SelectWeighBridge.jsx";
import Register from "./Pages/Admin/Register.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />


        <Route path="/branchManager" element={<BranchManager />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="header" element={<Header />} />
          <Route path="sidebar" element={<Sidebar />} />
          <Route path="profile" element={<Profile />} />
          <Route path="income" element={<Income />} />
          <Route path="expense" element={<Expense />} />
        </Route>

        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="sidebar" element={<Sidebar />} />
          <Route path="selectWeighBridge" element={<SelectWeighBridge />} />
          <Route path="register" element={<Register />} />
        </Route>

      </Routes>
    </div>
  );
};

export default App;

import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { GiExpense, GiWeightScale } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ hideMenu }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isBranchManager = location.pathname.startsWith("/branchManager");

  return (
    <div
      className={`w-64 h-[850px] bg-gray-900 text-white p-5 transition-all shadow-lg ${
        hideMenu ? "block" : "hidden"
      } max-sm:${hideMenu ? "hidden" : "block"} `}
    >
      <h2 className="text-lg font-semibold text-gray-300 mb-5 text-center">
        {isAdmin ? "Admin Panel" : isBranchManager ? "Branch Manager" : ""}
      </h2>

      {isAdmin && (
        <ul className="space-y-4">
          <li
            className={`flex items-center gap-2 p-2 rounded-md transition-all ${
              location.pathname === "/admin/dashboard"
                ? "bg-orange-500"
                : "hover:bg-gray-800"
            }`}
          >
            <MdDashboard />
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li
            className={`flex items-center gap-2 p-2 rounded-md transition-all ${
              location.pathname === "/admin/register"
                ? "bg-orange-500"
                : "hover:bg-gray-800"
            }`}
          >
            <CgProfile />
            <Link to="/admin/register">Create User</Link>
          </li>
          <li
            className={`flex items-center gap-2 p-2 rounded-md transition-all ${
              location.pathname === "/admin/selectWeighBridge"
                ? "bg-orange-500"
                : "hover:bg-gray-800"
            }`}
          >
            <GiWeightScale />
            <Link to="/admin/selectWeighBridge">Select WeighBridge</Link>
          </li>
        </ul>
      )}

      {isBranchManager && (
        <ul className="space-y-4">
          <li
            className={`flex items-center gap-2 p-2 rounded-md transition-all ${
              location.pathname === "/branchManager/dashboard"
                ? "bg-orange-500"
                : "hover:bg-gray-800"
            }`}
          >
            <MdDashboard />
            <Link to="/branchManager/dashboard">Dashboard</Link>
          </li>
          <li
            className={`flex items-center gap-2 p-2 rounded-md transition-all ${
              location.pathname === "/branchManager/profile"
                ? "bg-orange-500"
                : "hover:bg-gray-800"
            }`}
          >
            <CgProfile />
            <Link to="/branchManager/profile">Profile</Link>
          </li>
          <li
            className={`flex items-center gap-2 p-2 rounded-md transition-all ${
              location.pathname === "/branchManager/income"
                ? "bg-orange-500"
                : "hover:bg-gray-800"
            }`}
          >
            <GrMoney />
            <Link to="/branchManager/income">Income</Link>
          </li>
          <li
            className={`flex items-center gap-2 p-2 rounded-md transition-all ${
              location.pathname === "/branchManager/expense"
                ? "bg-orange-500"
                : "hover:bg-gray-800"
            }`}
          >
            <GiExpense />
            <Link to="/branchManager/expense">Expenses</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;

import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import { MdLogout } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const Header = ({ handleToggle }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isBranchManager = location.pathname.startsWith("/branchManager");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("User logged out successfully");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 shadow-md">
        <IoMenu
          className="text-3xl text-white cursor-pointer hover:scale-105 transition-transform"
          onClick={handleToggle}
        />

        <div className="flex items-center gap-4">
          <strong className="text-white text-lg">
            {isAdmin
              ? "Welcome Admin"
              : isBranchManager
              ? `Welcome ${localStorage.getItem("username")}`
              : ""}
          </strong>

          <div className="relative">
            <SlOptionsVertical
              className="cursor-pointer text-white text-xl hover:scale-105 transition-transform"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 top-8 bg-gray-800 text-white font-semibold p-3 rounded-md shadow-lg min-w-[140px]">
                <button
                  className="flex items-center gap-2 hover:text-orange-400 transition-all"
                  onClick={handleLogout}
                >
                  <MdLogout className="text-lg" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Toaster />
    </>
  );
};

export default Header;

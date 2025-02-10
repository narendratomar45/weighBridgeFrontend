import { useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { Outlet } from "react-router-dom";

const BranchManager = () => {
  const [hideMenu, setHideMenu] = useState(true);
  const handleToggle = () => {
    setHideMenu(!hideMenu);
  };
  return (
    <div>
      <Header handleToggle={handleToggle} />
      <div className="flex gap-28">
        <Sidebar hideMenu={hideMenu} />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BranchManager;

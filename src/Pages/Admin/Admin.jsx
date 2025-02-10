import { useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { Outlet } from "react-router-dom";

const Admin = () => {
  const [hideMenu, setHideMenu] = useState(true);
  const handleToggle = () => {
    setHideMenu(!hideMenu);
  };
  return (
    <div>
      <Header handleToggle={handleToggle} />
      <div className="flex gap-28">
        <Sidebar hideMenu={hideMenu} />
        <div className=" space-x-40 flex justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;

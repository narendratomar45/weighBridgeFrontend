import { Link } from "react-router-dom";

const VerifyRole = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6">
          Welcome to Dharam Kanta Cash Flow Management System
        </h1>
        <p className="text-gray-600 mb-4">
          Please select your role to continue.
        </p>
        <div className="space-y-4">
          <Link to={"/admin/dashboard"}>
            <button className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all">
              Admin
            </button>
          </Link>
          <Link to={"/login"}>
            <button className="w-full px-6 py-3 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-all my-5">
              Branch Manager
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyRole;

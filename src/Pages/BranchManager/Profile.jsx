import { useContext } from "react";
// import { AuthContext } from "../../Context/AuthProvider";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { WeighContext } from "../../Context/ContextProvider";
import profile from '../../assets/images/profile.png'

const Profile = () => {
  // const { user } = useContext(AuthContext);
  const { user } = useContext(WeighContext);
  console.log("PROFILEUSER", user);

  return (
    <div className="w-[500px] bg-gray-200 my-10 rounded-lg flex flex-col items-center p-5">
      <div className="w-full flex items-center mb-6 px-6">
        <Link
          to="/branchManager/dashboard"
          className="flex items-center text-blue-600 hover:text-blue-700 transition duration-300"
        >
          <div className="flex justify-center items-center p-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300">
            <IoMdArrowBack className="text-white mr-2" />
            <span className="font-semibold">Back to Dashboard</span>
          </div>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md flex flex-col items-center text-start">
        <div className="w-24 h-24 rounded-full border-4 border-green-500 overflow-hidden mb-4 text-start">
          <img
            src={profile}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 text-start">
          Name: {localStorage.getItem("username") || "Username"}
        </h2>
        <h2 className="text-2xl font-semibold text-gray-700 text-start">
          Mob: +{localStorage.getItem("contactNumber") || "Contact Number"}
        </h2>
        <h2 className="text-2xl font-semibold text-gray-700">
          Location :{user?.weighBridgeLocation || "Assigned WeighBridge"}
        </h2>
        <p className="text-2xl font-semibold text-gray-700">
          Email :{user?.email || "email@example.com"}
        </p>
      </div>
    </div>
  );
};

export default Profile;

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../Context/AuthProvider";
import { IoMdArrowBack } from "react-icons/io";
import Button from "../../Components/Button";
import toast, { Toaster } from "react-hot-toast";
import { WeighContext } from "../../Context/ContextProvider";


const Register = () => {
  // const { signup } = useContext(AuthContext);
  const { signup } = useContext(WeighContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    weighBridgeLocation: "",
    email: "",
    password: "",
    role: "",
    weighBridgeName: "",
    contactNumber: "",
  });
  const [error, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Username  required";
    }

    if (!formData.email) {
      newErrors.email = "Email required";
    }
    if (!formData.password) {
      newErrors.password = "Password required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password length must be at least 8 characters";
    }
    if (!formData.role) {
      newErrors.role = "Please specify your role (Admin or Branch Manager)";
    }
    if (!formData.weighBridgeName) {
      newErrors.weighBridgeName = "Assigned WeighBridge is required";
    }
    if (!formData.weighBridgeLocation) {
      newErrors.weighBridgeLocation = "WeighBridge Location required";
    }
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact Number required";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prevError) => ({ ...prevError, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await signup(
        formData.username,
        formData.weighBridgeLocation,
        formData.email,
        formData.password,
        formData.role,
        formData.weighBridgeName,
        formData.contactNumber
      );
      if (response) {
        console.log("User created Successfully");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }

    toast.success("User registered successfully");
    setFormData({
      username: "",
      weighBridgeLocation: "",
      email: "",
      password: "",
      role: "",
      weighBridgeName: "",
      contactNumber: "",
    });
  };

  return (
    <>

      <div className="w-[700px] bg-gray-200 rounded-lg shadow-lg p-8 flex flex-col justify-center items-center text-gray-800 m-auto">
      <div className="w-full flex items-center mb-5">
        <Link to="/admin/dashboard" className="flex items-center text-blue-500">
          <div className="flex justify-center items-center p-1 bg-blue-500 text-white rounded-md">
            <IoMdArrowBack className="text-white" />
            <Button
              name="Back to Dashboard"
              className="bg-blue-500 text-white"
            />
          </div>
        </Link>
      </div>
        <h1 className="text-2xl font-bold text-orange-600 mb-6">Create User</h1>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="WeighBridge Location"
              className="w-full px-4 py-2 border border-gray-400 focus:border-none rounded focus:ring-2 focus:ring-gray-700 focus:outline-none"
            />
            {error.username && (
              <p className="text-red-500 text-sm">{error.username}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-400 focus:border-none rounded-md focus:ring-2 focus:ring-gray-700 focus:outline-none"
            />
            {error.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-400 focus:border-none rounded-md focus:ring-2 focus:ring-gray-700 focus:outline-none"
            />
            {error.password && (
              <p className="text-red-500 text-sm">{error.password}</p>
            )}
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Admin/Branch Manager"
              className="w-full px-4 py-2 border border-gray-400 focus:border-none rounded-md focus:ring-2 focus:ring-gray-700 focus:outline-none"
            />
            {error.role && <p className="text-red-500 text-sm">{error.role}</p>}
          </div>
          <div>
            <label
              htmlFor="weighBridgeName"
              className="block text-sm font-medium"
            >
              WeighBridge Name
            </label>
            <input
              type="text"
              name="weighBridgeName"
              value={formData.weighBridgeName}
              onChange={handleChange}
              placeholder="Assigned WeighBridge ID"
              className="w-full px-4 py-2 border border-gray-400 focus:border-none rounded-md focus:ring-2 focus:ring-gray-700 focus:outline-none"
            />
            {error.weighBridgeName && (
              <p className="text-red-500 text-sm">{error.weighBridgeName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="weighBridgeLocation"
              className="block text-sm font-medium"
            >
              WeighBridge Location
            </label>
            <input
              type="text"
              name="weighBridgeLocation"
              value={formData.weighBridgeLocation}
              onChange={handleChange}
              placeholder="WeighBridge Location"
              className="w-full px-4 py-2 border border-gray-400 focus:border-none rounded focus:ring-2 focus:ring-gray-700 focus:outline-none"
            />
            {error.weighBridgeLocation && (
              <p className="text-red-500 text-sm">
                {error.weighBridgeLocation}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="contactNumber"
              className="block text-sm font-medium"
            >
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Contact Number"
              className="w-full px-4 py-2 border border-gray-400 focus:border-none rounded-md focus:ring-2 focus:ring-gray-700 focus:outline-none"
            />
            {error.contactNumber && (
              <p className="text-red-500 text-sm">{error.contactNumber}</p>
            )}
          </div>
          {/* <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition"
          >
            Create Account
          </button> */}
          <Button
            type="submit"
            name="Create Account"
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition"
          />
        </form>
        {/* <div className="mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span className="text-orange-600 font-medium hover:underline">
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            </span>
          </p>
        </div> */}
      </div>
      <Toaster />
    </>
  );
};

export default Register;

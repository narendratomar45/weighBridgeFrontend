import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../Context/AuthProvider";
import  { WeighContext } from "../../Context/ContextProvider";

const Login = () => {
  // const { login } = useContext(AuthContext);
  const { login } = useContext(WeighContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prevErr) => ({ ...prevErr, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password should be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await login(formData.email, formData.password);
      console.log("Logged in successfully");
    }
    if (localStorage.getItem("weighBridgeRole") === "Admin") {
      navigate("/admin/dashboard");
    } else navigate("/branchManager/dashboard");
  };

  return (
    <div className="w-[450px] bg-gray-100 rounded-lg shadow-md p-8 flex flex-col justify-center items-center text-gray-800 m-auto mt-12">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">
        Welcome Back to Dharam Kanta
      </h1>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded-md font-medium hover:bg-orange-700 transition"
        >
          Login
        </button>
      </form>
      {/* <div className="mt-4 text-sm text-gray-600">
        Don&apos;t have an account yet?{" "}
        <Link to="/" className="text-orange-600 font-medium hover:underline">
          Register
        </Link>
      </div> */}
    </div>
  );
};

export default Login;

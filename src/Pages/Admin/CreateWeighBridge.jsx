
import { useContext, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { AdminContext } from "../../Context/AdminProvider";
import toast, { Toaster } from "react-hot-toast";

const CreateWeighBridge = () => {
  const { fetchWeighBridge } = useContext(AdminContext);
  const [formData, setFormData] = useState({ name: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErr) => ({ ...prevErr, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await fetchWeighBridge(formData.name);
    toast.success("WeighBridge Created Successfully");
  };

  return (
    <>
      <div className="w-full flex items-center mb-6 px-6">
        <Link
          to="/admin/dashboard"
          className="flex items-center text-blue-600 hover:text-blue-700 transition duration-300"
        >
          <div className="flex justify-center items-center p-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300">
            <IoMdArrowBack className="text-white mr-2" />
            <span className="font-semibold">Back to Dashboard</span>
          </div>
        </Link>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl text-orange-500 font-bold text-center mb-6">
          Create WeighBridge
        </h1>
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              WeighBridge Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter weighBridge name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition duration-200"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 transition duration-300"
          >
            Create WeighBridge
          </button>
        </form>
      </div>

      <Toaster />
    </>
  );
};

export default CreateWeighBridge;

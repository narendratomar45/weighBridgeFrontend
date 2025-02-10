import { useContext, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { WeighContext } from "../../Context/ContextProvider";

const Income = () => {
  const { incomeData, getIncome } = useContext(WeighContext);
  const [formData, setFormData] = useState({
    location: localStorage.getItem("WeighBridgeLocation"),
    vehicleNumber: "",
    weight: "",
    ratePerKg: "",
    totalIncome: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.location) tempErrors.location = "Location is required.";
    if (!formData.vehicleNumber)
      tempErrors.vehicleNumber = "Vehicle Number is required.";
    if (!formData.weight || formData.weight <= 0)
      tempErrors.weight = "Weight must be a positive number.";
    if (!formData.ratePerKg || formData.ratePerKg <= 0)
      tempErrors.ratePerKg = "Rate per Kg must be a positive number.";
    if (!formData.totalIncome || formData.totalIncome <= 0)
      tempErrors.totalIncome = "Total Income must be a positive number.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await incomeData(
        formData.location,
        formData.vehicleNumber,
        formData.weight,
        formData.ratePerKg,
        formData.totalIncome
      );
      console.log("Form Submitted successfully", response);

      setFormData({
        location: localStorage.getItem("WeighBridgeLocation"),
        vehicleNumber: "",
        weight: "",
        ratePerKg: "",
        totalIncome: "",
      });

      toast.success("Income Data Added Successfully");
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
        Income Form
      </h1>
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
      <div className="w-full flex justify-between flex-wrap gap-10">
        <form
          onSubmit={handleSubmit}
          className="w-[400px] p-6 bg-gray-100 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.vehicleNumber ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.vehicleNumber && (
              <span className="text-red-500 text-sm">
                {errors.vehicleNumber}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Weight</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.weight ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.weight && (
              <span className="text-red-500 text-sm">{errors.weight}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Rate Per Ton</label>
            <input
              type="number"
              name="ratePerKg"
              value={formData.ratePerKg}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.ratePerKg ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.ratePerKg && (
              <span className="text-red-500 text-sm">{errors.ratePerKg}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Total Income</label>
            <input
              type="number"
              name="totalIncome"
              value={formData.totalIncome}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.totalIncome ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.totalIncome && (
              <span className="text-red-500 text-sm">{errors.totalIncome}</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Submit
          </button>
        </form>

        <div className="w-[400px] bg-gray-200 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Submitted Income Data
          </h2>
          {getIncome.length > 0 ? (
            <ul className="space-y-4 ">
              {getIncome
                .filter(
                  (item) =>
                    item.location ===
                    localStorage.getItem("WeighBridgeLocation")
                )
                .map((incomeData, index) => (
                  <li
                    key={index}
                    className="w-[350px] p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between my-5">
                      <p>
                        <strong>S.No. {index + 1}</strong>
                      </p>
                      <p>
                        <strong>Date: </strong>{" "}
                        {new Date(incomeData.createdAt).toLocaleDateString(
                          "en-GB"
                        )}
                      </p>
                    </div>
                    <p>
                      <strong>VehicleNumber: </strong>
                      {incomeData.vehicleNumber}
                    </p>
                    <p>
                      <strong>Total Weight: </strong>
                      {incomeData.weight} ton
                    </p>
                    <p>
                      <strong>ratePerTon: Rs.</strong>
                      {incomeData.ratePerKg}
                    </p>
                    <p>
                      <strong>Total Income: Rs.</strong>
                      {incomeData.totalIncome}
                    </p>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-gray-500">No income data added yet...</p>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Income;

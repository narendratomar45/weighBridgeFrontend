import { useContext, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { WeighContext } from "../../Context/ContextProvider";

const ExpenseForm = () => {
  const { expenseData, getExpense } = useContext(WeighContext);

  const [expenses, setExpenses] = useState({
    location: localStorage.getItem("WeighBridgeLocation"),
    expenseType: "",
    recipientName: "",
    billType: "",
    maintenanceType: "",
    otherDetails: "",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenses((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const { location, expenseType, amount, description } = expenses;
    if (!location || !expenseType || !amount || !description) {
      alert("All fields are hellrequired");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const requestData = {
      location: expenses.location,
      expenseType: expenses.expenseType,
      salaryDetails:
        expenses.expenseType === "Salary"
          ? { recipientName: expenses.recipientName }
          : null,
      billType: expenses.expenseType === "Bill" ? expenses.billType : null,
      maintenanceType:
        expenses.expenseType === "Maintenance"
          ? expenses.maintenanceType
          : null,
      otherDetails:
        expenses.expenseType === "Other" ? expenses.otherDetails : null,
      amount: parseFloat(expenses.amount),
      description: expenses.description,
    };

    try {
      await expenseData(requestData);
      setExpenses({
        location: localStorage.getItem("WeighBridgeLocation"),
        expenseType: "",
        recipientName: "",
        billType: "",
        maintenanceType: "",
        otherDetails: "",
        amount: "",
        description: "",
      });
      toast.success("Expense Data Added Successfully");
    } catch (error) {
      alert(
        "Error adding expense: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center">
        Submit Expense Data
      </h2>
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
      <div className=" w-full flex justify-between flex-wrap gap-10">
        <form
          onSubmit={handleSubmit}
          className="w-[400px] h-full  p-8 bg-gray-100 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="location" className="block font-medium mb-1">
              WeighBridge Location:
            </label>
            <input
              type="text"
              name="location"
              value={expenses.location}
              required
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Expense Type:</label>
            <select
              name="expenseType"
              value={expenses.expenseType}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
            >
              <option value="">Select</option>
              <option value="Salary">Salary</option>
              <option value="Bill">Bill</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {expenses.expenseType === "Salary" && (
            <div className="mb-4">
              <label className="block font-medium mb-1">Recipient Name:</label>
              <input
                type="text"
                name="recipientName"
                value={expenses.recipientName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
              />
            </div>
          )}

          {expenses.expenseType === "Bill" && (
            <div className="mb-4">
              <label className="block font-medium mb-1">Bill Type:</label>
              <select
                name="billType"
                value={expenses.billType}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
              >
                <option value="">Select</option>
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="Stationary">Stationary</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          {expenses.expenseType === "Maintenance" && (
            <div className="mb-4">
              <label className="block font-medium mb-1">
                Maintenance Type:
              </label>
              <select
                type="text"
                name="maintenanceType"
                value={expenses.maintenanceType}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
              >
                <option value="">Select</option>
                <option value="equipment">Equipment</option>
                <option value="repair">Repair</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}

          {expenses.expenseType === "Other" && (
            <div className="mb-4">
              <label className="block font-medium mb-1">Other Details:</label>
              <input
                type="text"
                name="otherDetails"
                value={expenses.otherDetails}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block font-medium mb-1">Amount:</label>
            <input
              type="number"
              name="amount"
              value={expenses.amount}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Description:</label>
            <textarea
              name="description"
              value={expenses.description}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Submit
          </button>
        </form>

        {/** Submitted Expense */}
        <div className="min-w-[400px] bg-gray-200 rounded-lg shadow-lg p-5 max-sm:my-5 ">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Submitted Expenses:
          </h3>
          {getExpense?.length > 0 ? (
            getExpense
              .filter(
                (item) =>
                  item.location === localStorage.getItem("WeighBridgeLocation")
              )
              .map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border  p-3 rounded-lg shadow-xl mt-2"
                >
                  <p>
                    <span className="text-black">Expense Type:</span>
                    {item.expenseType}
                  </p>

                  {/* Salary Details */}
                  {item.expenseType === "Salary" &&
                    item.salaryDetails?.recipientName && (
                      <p>
                        <span className="text-black">Recipient:</span>{" "}
                        {item.salaryDetails.recipientName}
                      </p>
                    )}

                  {/* Bill Type */}
                  {item.expenseType === "Bill" && item.billType && (
                    <p>
                      <span className="text-black">Bill Type:</span>{" "}
                      {item.billType}
                    </p>
                  )}

                  {/* Maintenance Type */}
                  {item.expenseType === "Maintenance" &&
                    item.maintenanceType && (
                      <p>
                        <span className="text-black">Maintenance Type:</span>{" "}
                        {item.maintenanceType}
                      </p>
                    )}

                  <p>
                    <span className="text-black">Amount:</span> {item.amount}
                  </p>
                  <p>
                    <span className="text-black">Description:</span>{" "}
                    {item.description}
                  </p>
                </div>
              ))
          ) : (
            <p className="text-gray-400">No expenses found.</p>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ExpenseForm;

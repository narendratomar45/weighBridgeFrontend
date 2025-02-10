import logo from "../assets/images/DharamKanta.png";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="w-32 h-32 flex justify-center items-center animate-spin rounded-full border-4 border-red-500 border-t-transparent">
            <img
              src={logo}
              alt="Dharam Kanta Logo"
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
        <h3 className="text-xl text-orange-900 font-bold">Loading...</h3>
      </div>
    </div>
  );
};

export default Loading;

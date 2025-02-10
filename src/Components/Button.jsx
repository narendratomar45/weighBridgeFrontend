const Button = ({ name, className ,type}) => {
  return (
    <div>
      <button type={type} className={`px-4 py-2 rounded-md transition-all ${className}`}>
        {name}
      </button>
    </div>
  );
};

export default Button;

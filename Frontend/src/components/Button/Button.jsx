import { useNavigate } from "react-router-dom";

const Button = ({ label, type = "secondary", navigateTo = "", style = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(navigateTo)}
      className={`rounded-full font-semibold cursor-pointer border border-blue-600 shadow-lg shadow-gray-300 hover:shadow-gray-200 transition-colors duration-200 ${style} ${
        type === "primary"
          ? "text-white bg-blue-600 hover:bg-blue-700"
          : "text-blue-600 hover:bg-blue-50"
      }`}
    >
      {label}
    </button>
  );
};

export default Button;

import { useNavigate } from "react-router-dom";

const Button = ({
  label,
  type = "secondary",
  onClick,
  navigateTo = "",
  style = "",
}) => {
  const navigate = useNavigate();

  /**
   * Function to handle click
   * If navigateTo is used navigate the user or use onClick function
   */
  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
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

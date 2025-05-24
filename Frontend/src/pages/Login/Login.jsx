import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, ErrorMessage, Loader } from "../../components";
import UserContext from "../../context/userContext";
import axios from "axios";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  /**
   * Handle form field changes
   */
  const handleChange = (field) => (value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Function to Login user
   *
   * @param {Event} e
   */
  const login = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post("/api/v1/users/login", userData, {
        withCredentials: true,
      });

      const { username, email } = response?.data?.data?.user || {};

      // set user in global context
      setUser({ username, email });

      // if user successfully logged in, navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error: ", error?.message || error);

      setErrorMessage(
        "Something went wrong. Please check your email and password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center px-5 sm:px-10 text-gray-900">
      {isLoading && <Loader />}
      <div
        className={`w-full max-w-md bg-white shadow-md rounded-xl p-8 space-y-6 border border-gray-100 ${
          isLoading ? "opacity-40" : ""
        }`}
      >
        <h2 className="sm:text-3xl text-2xl font-bold text-center text-blue-600">
          Sign In
        </h2>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <form
          onSubmit={login}
          className={`space-y-4 ${isLoading ? "pointer-events-none" : ""}`}
        >
          <Input
            type="email"
            label="Email Address"
            name="email"
            value={userData.email}
            onChange={handleChange("email")}
            required
          />

          <Input
            type="password"
            label="Password"
            name="password"
            value={userData.password}
            onChange={handleChange("password")}
            required
          />

          <Button label="Login" type="primary" style="w-full py-3 text-lg" />
        </form>

        <p
          className={`text-sm text-center text-gray-500 ${
            isLoading ? "pointer-events-none" : ""
          }`}
        >
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

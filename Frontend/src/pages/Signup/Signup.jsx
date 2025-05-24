import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ErrorMessage, Input, Loader } from "../../components";
import UserContext from "../../context/userContext";
import axios from "axios";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  /**
   * Handle form field changes
   */
  const handleChange = (field) => (value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Function to register user
   *
   * @param {Event} e
   */
  const signup = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // return if password validation fails
    if (!passwordRegex.test(userData.password)) return;

    setIsLoading(true);

    try {
      const response = await axios.post("/api/v1/users/register", userData, {
        withCredentials: true,
      });

      const { username, email } = response?.data?.data || {};

      // set user in global context
      setUser({ username, email });

      // if user successfully registered, navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup Error: ", error?.message || error);

      setErrorMessage("Something went wrong. Please try again.");
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
          Create Account
        </h2>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <form
          onSubmit={signup}
          className={`space-y-4 ${isLoading ? "pointer-events-none" : ""}`}
        >
          <Input
            label="Username"
            name="username"
            value={userData.username}
            onChange={handleChange("username")}
            required
          />
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
          {userData.password && !passwordRegex.test(userData.password) && (
            <p className="text-xs font-medium text-red-500">
              Password must be at least 8 characters and include uppercase,
              lowercase, and a number
            </p>
          )}
          <Button label="Sign Up" type="primary" style="w-full py-3 text-lg" />
        </form>

        <p
          className={`text-sm text-center text-gray-500 ${
            isLoading ? "pointer-events-none" : ""
          }`}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

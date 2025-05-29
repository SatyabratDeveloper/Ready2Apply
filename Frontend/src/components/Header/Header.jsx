import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components";
import UserContext from "../../context/userContext";
import axios from "axios";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  /**
   * Function to logout user
   *
   * @param {Event} e
   */
  const logout = async () => {
    try {
      await axios.post("/api/v1/users/logout", {}, { withCredentials: true });

      // set user to null
      setUser(null);
      localStorage.removeItem("user");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error?.message || error);
    }
  };

  return (
    <header className="flex justify-between items-center 2xl:px-48 xl:px-32 lg:px-24 md:px-12 sm:px-8 px-4 py-7">
      <div className="sm:text-2xl text-xl font-extrabold tracking-tight">
        <Link to="/" className="flex items-center gap-0.5">
          <span className="text-blue-600">Ready</span>
          <span className="text-white bg-blue-600 px-1 rounded">2</span>
          <span className="text-gray-800">Apply</span>
        </Link>
      </div>
      <nav className="space-x-3 flex items-center">
        {user?.username ? (
          <>
            <Button
              label="Logout"
              type="primary"
              onClick={logout}
              style={"px-5 py-2 md:text-md text-sm hidden sm:inline-block"}
            />
          </>
        ) : (
          <>
            <Button
              label="Login"
              type="secondary"
              navigateTo="/login"
              style="md:px-5 px-3 md:py-2 py-1 md:text-md text-sm"
            />
            <Button
              label="Get Started"
              type="primary"
              navigateTo="/signup"
              style={"px-5 py-2 md:text-md text-sm hidden sm:inline-block"}
            />
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

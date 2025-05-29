import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/userContext";
import { Loader } from "../";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Loader />;

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

import { useState } from "react";
import UserContext from "./userContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "", email: "" });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

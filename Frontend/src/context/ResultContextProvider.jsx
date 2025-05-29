import { useState } from "react";
import ResultContext from "./resultContext";

export const ResultContextProvider = ({ children }) => {
  const [result, setResult] = useState(null);

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  );
};

export default ResultContextProvider;

import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
import UserContextProvider from "./context/userContextProvider";
import ResultContextProvider from "./context/ResultContextProvider";

function App() {
  return (
    <UserContextProvider>
      <ResultContextProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow flex flex-col">
            <Outlet />
          </main>
          <Footer />
        </div>
      </ResultContextProvider>
    </UserContextProvider>
  );
}

export default App;

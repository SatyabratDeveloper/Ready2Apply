import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
import UserContextProvider from "./context/userContextProvider";

function App() {
  return (
    <UserContextProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
    </UserContextProvider>
  );
}

export default App;

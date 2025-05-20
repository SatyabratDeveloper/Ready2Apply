import { Link } from "react-router-dom";

const Header = () => {
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
        <Link
          to="/login"
          className="md:px-5 px-3 md:py-2 py-1 rounded-full font-semibold text-blue-600 border border-blue-600 bg-white shadow-sm hover:bg-blue-50 transition-colors duration-200"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-5 py-2 hidden sm:inline-block  rounded-full font-semibold text-white border border-blue-600 bg-blue-600 shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
};

export default Header;

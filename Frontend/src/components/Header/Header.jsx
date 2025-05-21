import { Link } from "react-router-dom";
import { Button } from "../../components";

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
      </nav>
    </header>
  );
};

export default Header;

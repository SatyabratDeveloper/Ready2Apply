import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-gray-900 sm:px-10 px-5">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="lg:text-6xl sm:text-5xl text-4xl font-bold lg:max-w-3xl md:max-w-xl sm:max-w-lg max-w-md leading-tight">
          Optimize your <span className="text-blue-600 italic">resume</span>{" "}
          with <span className="text-blue-600 italic">AI</span> and get
          job-ready instantly
        </h1>
        <p className="mt-8 lg:text-lg sm:text-md text-sm lg:max-w-xl md:max-w-lg sm:max-w-md max-w-xs text-gray-600">
          Upload your resume, paste the job description, and let AI evaluate
          your fit. Get a score and personalized suggestions
        </p>
        <Link
          to="/signup"
          className="mt-8 md:px-10 px-5 md:py-4 py-2 rounded-full md:text-lg sm:text-md font-semibold text-white border border-blue-600
          bg-blue-600 shadow-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Get Started Free
        </Link>
        <p className="sm:text-sm text-xs text-gray-400 mt-3">
          No credit card required
        </p>
      </div>
    </div>
  );
};

export default Landing;

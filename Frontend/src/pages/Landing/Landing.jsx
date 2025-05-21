import { Link } from "react-router-dom";
import { Button } from "../../components";

const Landing = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-gray-900 sm:px-10 px-5">
      <div className="flex flex-col items-center justify-center text-center gap-5">
        <h1 className="lg:text-6xl sm:text-5xl text-4xl font-bold lg:max-w-3xl md:max-w-xl sm:max-w-lg max-w-md leading-tight">
          Optimize your <span className="text-blue-600 italic">resume</span>{" "}
          with <span className="text-blue-600 italic">AI</span> and get
          job-ready instantly
        </h1>
        <p className="lg:text-lg sm:text-md text-sm lg:max-w-xl md:max-w-lg sm:max-w-md max-w-xs text-gray-600">
          Upload your resume, paste the job description, and let AI evaluate
          your fit. Get a score and personalized suggestions
        </p>
        <div>
          <Button
            label="Get Started Free"
            type="primary"
            navigateTo="/signup"
            style="md:px-10 px-7 md:py-4 py-3 md:text-lg text-md"
          />
          <p className="sm:text-sm text-xs text-gray-400 mt-2">
            No credit card required
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;

import { useState, useContext } from "react";
import { Button, Input, Loader } from "../../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ResultContext from "../../context/resultContext";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setResult } = useContext(ResultContext);

  /**
   * Function to handle file change
   *
   * @param {Event} e
   */
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (
      selected &&
      [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(selected.type)
    ) {
      setFile(selected);
    } else {
      alert("Please upload a valid PDF or DOCX file.");
    }
  };

  /**
   * Function to evaluate/match resume with job description using AI
   *
   * @returns - JSON result
   */
  const evaluate = async () => {
    if (!file || !jobTitle || !jobDescription) {
      return alert("All fields are required.");
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobTitle", jobTitle);
    formData.append("jobDescription", jobDescription);

    try {
      const { data } = await axios.post("/api/v1/ai/review", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(data.data);

      // Store result and navigate
      setResult(data.data);
      navigate("/report-analysis");
    } catch (error) {
      console.error("AI Review Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <div
        className={`flex-grow flex flex-col items-center justify-start px-5 sm:px-10 py-12 text-gray-900 space-y-8 w-full max-w-4xl mx-auto ${
          loading ? "opacity-40" : ""
        }`}
      >
        {/* Instructional Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-blue-600">
            Let AI Evaluate Your Resume
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            Upload your resume, enter the job title, and paste the job
            description to see how well you match the role.
          </p>
        </div>

        {/* Resume Upload */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Upload Resume (PDF or DOCX)
          </label>
          <div className="relative w-full border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:bg-blue-50 transition">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <p className="text-gray-500 text-sm">
              Click to upload or drag your resume here
            </p>
            {file && (
              <p className="mt-2 text-green-600 font-medium">
                Selected: {file.name}
              </p>
            )}
          </div>
        </div>

        {/* Job Title Input */}
        <div className="w-full">
          <Input
            label="Job Title"
            name="jobTitle"
            value={jobTitle}
            onChange={(val) => setJobTitle(val)}
            required
          />
        </div>

        {/* Job Description */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={8}
            placeholder="Copy and paste the job description here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <Button
          label="Start AI Evaluation"
          type="primary"
          onClick={evaluate}
          style="w-full py-3 text-lg"
        />
      </div>
    </div>
  );
};

export default Dashboard;

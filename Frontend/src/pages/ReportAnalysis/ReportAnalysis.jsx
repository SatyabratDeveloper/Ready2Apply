import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResultContext from "../../context/resultContext";

const ReportAnalysis = () => {
  const { result } = useContext(ResultContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!result) {
      navigate("/dashboard");
    }
  }, [result, navigate]);

  if (!result) return null;

  const { summary, score, matches, gaps, suggestions } = result;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-gray-900 space-y-8">
      {/* Summary / Intro */}
      <section>
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          AI Resume Review
        </h1>
        <p className="text-gray-700 text-lg">{summary}</p>
        <hr className="my-6 border-gray-200" />
      </section>

      {/* Score */}
      <section>
        <h2 className="text-xl font-semibold text-blue-500">
          Resume-Job Fit Score
        </h2>
        <p className="text-3xl font-bold text-green-600 mt-2">{score}%</p>
      </section>

      {/* Key Matches */}
      <section>
        <h2 className="text-xl font-semibold text-blue-500 mt-8 mb-2">
          ✅ Key Matches and Strengths
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {matches.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Gaps */}
      <section>
        <h2 className="text-xl font-semibold text-yellow-600 mt-8 mb-2">
          ⚠️ Gaps and Areas for Improvement
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {gaps.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Suggestions */}
      <section>
        <h2 className="text-xl font-semibold text-purple-700 mt-8 mb-2">
          💡 Suggestions to Improve Your Resume
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {suggestions.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ReportAnalysis;

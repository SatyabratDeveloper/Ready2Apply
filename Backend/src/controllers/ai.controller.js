import generateContent from "../services/ai.service.js";
import { ApiError, ApiResponse } from "../utils/index.js";

/**
 * Function to generate AI Review from user resume and job description
 *
 * @param {any} req
 * @param {any} res
 * @returns res - A JSON response
 */
const generateAiReview = async (req, res) => {
  const resumeFile = req.file;
  const jobTitle = req.body.jobTitle;
  const jobDescription = req.body.jobDescription;
  let result;

  if (!resumeFile) {
    throw new ApiError(400, "Resume file is required");
  }
  if (!jobTitle || !jobDescription) {
    throw new ApiError(400, "Job Title and Description is required");
  }

  const responseText = await generateContent(
    resumeFile,
    jobTitle,
    jobDescription
  );

  const jsonString = responseText.match(/\{[\s\S]*\}/)?.[0];

  if (!jsonString) {
    throw new ApiError(500, "AI response could not be parsed as JSON.");
  }

  try {
    result = JSON.parse(jsonString);
  } catch (error) {
    console.error("JSON parse error:", error);
    throw new ApiError(500, "Invalid JSON format from AI.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Result from AI fetched successfully."));
};

export { generateAiReview };

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

  if (!resumeFile) {
    throw new ApiError(400, "Resume file is required");
  }
  if (!jobTitle || !jobDescription) {
    throw new ApiError(400, "Job Title and Description is required");
  }

  const response = await generateContent(resumeFile, jobTitle, jobDescription);

  return res
    .status(200)
    .json(
      new ApiResponse(200, response, "Result from AI fetched successfully.")
    );
};

export { generateAiReview };

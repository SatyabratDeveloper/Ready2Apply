import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_API_KEY });

/**
 * Function to generate review based on prompt using GoogleGenAI
 *
 * @param {File} resumeFile - Multer file object
 * @param {String} jobTitle
 * @param {String} jobDescription
 * @returns {Promise<string>} response
 */
const generateReview = async (resumeFile, jobTitle, jobDescription) => {
  // Convert the file buffer to a base64 string
  const resumeBase64 = resumeFile.buffer.toString("base64");
  const prompt = `You are an expert career counselor and resume analyst. Your task is to evaluate a candidate's resume against a given job title and job description.

**Here's the information you will receive:**

* **Job Title:** ${jobTitle}
* **Job Description:** ${jobDescription}
* **Resume:** [PDF content of the resume will be provided as inlineData]

**Your response should be structured as follows:**

---

## Resume-Job Fit Analysis

**Overall Match Score:** [A percentage score from 0-100 indicating how well the resume matches the job description. Higher is better.]%

---

## Key Matches and Strengths

* Identify and list specific skills, experiences, and qualifications from the resume that directly align with the job description.
* Provide brief explanations for each match, highlighting why it's relevant.

---

## Identified Gaps and Areas for Improvement

* List any significant skills, experiences, or qualifications mentioned in the job description that are either missing from the resume or are not clearly articulated.
* Be specific about what's missing or needs more emphasis.

---

## Actionable Suggestions to Improve Score

* Provide concrete and actionable advice on how the candidate can modify their resume to better align with the job description and increase their match score.
* Suggestions should be practical and focus on:
    * **Keywords:** Which keywords from the job description should be added or emphasized?
    * **Experience:** How can existing experience be rephrased or highlighted to better showcase relevant achievements?
    * **Skills:** What specific skills should be added or elaborated upon, and how can they be demonstrated?
    * **Quantifiable Achievements:** Advise on incorporating metrics and quantifiable results where applicable.
    * **Formatting/Structure (if applicable):** Briefly suggest any structural changes that could improve readability or impact.
* Prioritize suggestions that will have the most significant impact on improving the match.`;

  const contents = [
    {
      text: prompt,
    },
    {
      inlineData: {
        mimeType: "application/pdf",
        data: resumeBase64,
      },
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: contents,
  });

  console.log(response.text);
  return response.text;
};

export default generateReview;

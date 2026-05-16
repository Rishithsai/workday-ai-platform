const model = require("./geminiService");

exports.parseResumeWithAI = async (
  resumeText
) => {
  const prompt = `
Extract structured JSON from this resume.

Return ONLY valid JSON.

Fields:
- firstName
- lastName
- email
- phone
- location
- skills
- experience
- education
- linkedin
- github

Resume:
${resumeText}
`;

  const result = await model.generateContent(
    prompt
  );

  const response =
    result.response.text();

  try {
    return JSON.parse(response);
  } catch {
    return {};
  }
};
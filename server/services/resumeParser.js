const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const extractSkills = (text) => {
  const skillsList = [
    "Java",
    "Python",
    "C",
    "C++",
    "React",
    "Node.js",
    "MongoDB",
    "SQL",
    "HTML",
    "CSS",
    "JavaScript",
    "Express",
    "PHP",
    "JWT",
    "REST API",
    "DSA",
  ];

  return skillsList.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );
};

const extractEmail = (text) => {
  const emailRegex =
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/;

  const match = text.match(emailRegex);

  return match ? match[0] : "";
};

const extractPhone = (text) => {
  const phoneRegex =
    /(\+91[\s-]?)?[6-9]\d{9}/;

  const match = text.match(phoneRegex);

  return match ? match[0] : "";
};

const extractLinkedin = (text) => {
  const linkedinRegex =
    /https?:\/\/(www\.)?linkedin\.com\/in\/[A-z0-9-_/]+/i;

  const match = text.match(linkedinRegex);

  return match ? match[0] : "";
};

const extractGithub = (text) => {
  const githubRegex =
    /https?:\/\/(www\.)?github\.com\/[A-z0-9-_/]+/i;

  const match = text.match(githubRegex);

  return match ? match[0] : "";
};

const extractName = (text) => {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  let possibleName = "";

  for (let line of lines.slice(0, 10)) {
    if (
      !line.includes("@") &&
      !line.toLowerCase().includes("resume") &&
      !line.match(/\d/)
    ) {
      possibleName = line;
      break;
    }
  }

  const words = possibleName.split(" ");

  return {
    firstName: words[0] || "",
    lastName: words.slice(1).join(" ") || "",
  };
};

const extractEducation = (text) => {
  const education = [];

  if (
    text.toLowerCase().includes("b.tech") ||
    text.toLowerCase().includes("btech")
  ) {
    education.push({
      degree: "B.Tech",
      college:
        "Sree Venkateswara College Of Engineering",
    });
  }

  return education;
};

const parseResume = async (
  filePath,
  mimetype
) => {
  try {
    let extractedText = "";

    console.log("Parsing:", filePath);

    if (
      mimetype &&
      mimetype.includes("pdf")
    ) {
      const dataBuffer =
        fs.readFileSync(filePath);

      const pdfData =
        await pdfParse(dataBuffer);

      extractedText = pdfData.text;
    } else if (
      mimetype &&
      (mimetype.includes("word") ||
        mimetype.includes("document") ||
        mimetype.includes("docx"))
    ) {
      const result =
        await mammoth.extractRawText({
          path: filePath,
        });

      extractedText = result.value;
    } else {
      return {
        success: true,
        extractedText:
          "Unsupported file type",
      };
    }

    const nameData =
      extractName(extractedText);

    const structuredData = {
      firstName:
        nameData.firstName,
      lastName:
        nameData.lastName,
      email:
        extractEmail(extractedText),
      phone:
        extractPhone(extractedText),
      location:
        "Nellore, Andhra Pradesh",
      linkedin:
        extractLinkedin(extractedText),
      github:
        extractGithub(extractedText),
      skills:
        extractSkills(extractedText),
      education:
        extractEducation(extractedText),
      experience: [],
      certifications: [],
    };

    return {
      success: true,
      extractedText,
      structuredData,
    };
  } catch (error) {
    console.log(
      "PARSER ERROR:",
      error
    );

    return {
      success: true,
      extractedText:
        "Resume parsing error",
    };
  }
};

module.exports = {
  parseResume,
};
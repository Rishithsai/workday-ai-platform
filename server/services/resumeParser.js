const fs =
  require("fs");

const mammoth =
  require("mammoth");

const pdf =
  require("pdf-parse");

// ==========================
// STRUCTURED DATA EXTRACTION
// ==========================

const extractStructuredData =
  (text) => {

    const email =
      text.match(
        /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
      );

    const phone =
      text.match(
        /(\+91)?\s?[6-9]\d{9}/
      );

    const linkedin =
      text.match(
        /(https?:\/\/)?(www\.)?linkedin\.com\/[^\s]+/i
      );

    const skills = [];

    const skillList = [

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
      "Express"
    ];

    skillList.forEach(
      (skill) => {

        if (
          text
            .toLowerCase()
            .includes(
              skill.toLowerCase()
            )
        ) {

          skills.push(
            skill
          );
        }
      }
    );

    return {

      firstName:
        "Rishith",

      lastName:
        "Sai",

      email:
        email
          ? email[0]
          : "",

      phone:
        phone
          ? phone[0]
          : "",

      location:
        "Nellore, Andhra Pradesh",

      linkedin:
        linkedin
          ? linkedin[0]
          : "",

      github: "",

      skills,

      education: [],

      experience: [],

      certifications: []
    };
  };

// ==========================
// PARSE RESUME
// ==========================

const parseResume =
  async (
    filePath
  ) => {

    try {

      console.log(
        "Parsing:",
        filePath
      );

      const fileBuffer =
        fs.readFileSync(
          filePath
        );

      let extractedText =
        "";

      // PDF

      if (
        filePath.endsWith(
          ".pdf"
        )
      ) {

        const data =
          await pdf(
            fileBuffer
          );

        extractedText =
          data.text;
      }

      // DOCX

      else if (
        filePath.endsWith(
          ".docx"
        )
      ) {

        const result =
          await mammoth.extractRawText(
            {
              path:
                filePath
            }
          );

        extractedText =
          result.value;
      }

      else {

        extractedText =
          "Unsupported file type";
      }

      const structuredData =
        extractStructuredData(
          extractedText
        );

      return {

        extractedText,

        structuredData
      };

    } catch (error) {

      console.log(
        "PARSER ERROR:",
        error
      );

      throw error;
    }
  };

module.exports = {
  parseResume
};
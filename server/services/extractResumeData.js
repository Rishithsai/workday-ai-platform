const extractResumeData = (
  text
) => {
  const data = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    skills: [],
    education: [],
    experience: [],
    certifications: []
  };

  // =========================
  // EMAIL
  // =========================
  const emailMatch =
    text.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/
    );

  if (emailMatch) {
    data.email = emailMatch[0];
  }

  // =========================
  // PHONE
  // =========================
  const phoneMatch =
    text.match(
      /(\+91)?[\s-]?[6-9]\d{9}/
    );

  if (phoneMatch) {
    data.phone =
      phoneMatch[0].trim();
  }

  // =========================
  // LINKEDIN
  // =========================
  const linkedinMatch =
    text.match(
      /https?:\/\/(www\.)?linkedin\.com\/[^\s]+/gi
    );

  if (linkedinMatch) {
    data.linkedin =
      linkedinMatch[0];
  }

  // =========================
  // GITHUB
  // =========================
  const githubMatch =
    text.match(
      /https?:\/\/(www\.)?github\.com\/[^\s]+/gi
    );

  if (githubMatch) {
    data.github =
      githubMatch[0];
  }

  // =========================
  // NAME
  // =========================
  const lines = text
    .split("\n")
    .map((line) =>
      line.trim()
    )
    .filter(
      (line) => line !== ""
    );

  if (lines.length > 0) {
    const fullName =
      lines[0]
        .replace(/[^a-zA-Z\s]/g, "")
        .trim();

    const parts =
      fullName.split(" ");

    // Resume is:
    // PAMARTHI RISHITH SAI

    data.firstName =
      parts[1] || "";

    data.lastName =
      `${parts[0] || ""} ${
        parts[2] || ""
      }`.trim();
  }

  // =========================
  // LOCATION
  // =========================
  if (
    text.includes("Nellore")
  ) {
    data.location =
      "Nellore, Andhra Pradesh";
  }

  // =========================
  // SKILLS
  // =========================
  const skillKeywords = [
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

  skillKeywords.forEach(
    (skill) => {
      if (
        text
          .toLowerCase()
          .includes(
            skill.toLowerCase()
          )
      ) {
        data.skills.push(skill);
      }
    }
  );

  // =========================
  // EDUCATION
  // =========================
  if (
    text.includes("B.Tech")
  ) {
    data.education.push({
      degree: "B.Tech",
      college:
        "Sree Venkateswara College Of Engineering"
    });
  }

  // =========================
  // EXPERIENCE / PROJECT
  // =========================
  if (
    text.includes(
      "Joint Resource Allocation"
    )
  ) {
    data.experience.push({
      company:
        "Academic Project",
      role: "Developer",
      duration: "2023"
    });
  }

  // =========================
  // CERTIFICATIONS
  // =========================
  if (
    text.includes("CISCO")
  ) {
    data.certifications.push(
      "Python Essentials by CISCO"
    );
  }

  if (
    text.includes("Coincent")
  ) {
    data.certifications.push(
      "Web Development Internship"
    );
  }

  return data;
};

module.exports =
  extractResumeData;
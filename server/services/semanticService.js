const semanticMap = (label, resume) => {
  if (!label || !resume) {
    return {
      value: "",
      confidence: 0
    };
  }

  const field = label.toLowerCase().trim();

  // First Name
  if (
    field.includes("first name") ||
    field.includes("given name") ||
    field.includes("forename")
  ) {
    return {
      value: resume.firstName || "",
      confidence: 0.98
    };
  }

  // Last Name
  if (
    field.includes("last name") ||
    field.includes("surname") ||
    field.includes("family name")
  ) {
    return {
      value: resume.lastName || "",
      confidence: 0.98
    };
  }

  // Full Name
  if (
    field.includes("full name") ||
    field === "name"
  ) {
    return {
      value: `${resume.firstName || ""} ${resume.lastName || ""}`.trim(),
      confidence: 0.95
    };
  }

  // Email
  if (
    field.includes("email") ||
    field.includes("email address")
  ) {
    return {
      value: resume.email || "",
      confidence: 0.99
    };
  }

  // Phone
  if (
    field.includes("phone") ||
    field.includes("mobile") ||
    field.includes("contact number")
  ) {
    return {
      value: resume.phone || "",
      confidence: 0.97
    };
  }

  // Address / Location
  if (
    field.includes("location") ||
    field.includes("city") ||
    field.includes("address")
  ) {
    return {
      value: resume.location || "",
      confidence: 0.9
    };
  }

  // LinkedIn
  if (
    field.includes("linkedin")
  ) {
    return {
      value: resume.linkedin || "",
      confidence: 0.99
    };
  }

  // GitHub
  if (
    field.includes("github")
  ) {
    return {
      value: resume.github || "",
      confidence: 0.99
    };
  }

  // Skills
  if (
    field.includes("skills") ||
    field.includes("technologies") ||
    field.includes("tech stack")
  ) {
    return {
      value: Array.isArray(resume.skills)
        ? resume.skills.join(", ")
        : "",
      confidence: 0.92
    };
  }

  // Experience Summary
  if (
    field.includes("experience") ||
    field.includes("work history") ||
    field.includes("employment")
  ) {
    const exp =
      resume.experience
        ?.map((job) => {
          return `
${job.role || ""}
at ${job.company || ""}
(${job.duration || ""})
`;
        })
        .join("\n") || "";

    return {
      value: exp,
      confidence: 0.9
    };
  }

  // Current Company
  if (
    field.includes("current company") ||
    field.includes("employer")
  ) {
    return {
      value:
        resume.experience?.[0]?.company || "",
      confidence: 0.88
    };
  }

  // Current Role
  if (
    field.includes("current role") ||
    field.includes("job title") ||
    field.includes("designation")
  ) {
    return {
      value:
        resume.experience?.[0]?.role || "",
      confidence: 0.88
    };
  }

  // Education
  if (
    field.includes("education") ||
    field.includes("degree") ||
    field.includes("qualification")
  ) {
    const edu =
      resume.education
        ?.map((e) => {
          return `
${e.degree || ""}
${e.college || ""}
`;
        })
        .join("\n") || "";

    return {
      value: edu,
      confidence: 0.9
    };
  }

  // College
  if (
    field.includes("college") ||
    field.includes("university") ||
    field.includes("school")
  ) {
    return {
      value:
        resume.education?.[0]?.college || "",
      confidence: 0.85
    };
  }

  // Degree
  if (
    field.includes("degree")
  ) {
    return {
      value:
        resume.education?.[0]?.degree || "",
      confidence: 0.87
    };
  }

  // Certifications
  if (
    field.includes("certification") ||
    field.includes("certificate")
  ) {
    return {
      value: Array.isArray(
        resume.certifications
      )
        ? resume.certifications.join(", ")
        : "",
      confidence: 0.82
    };
  }

  // Years of Experience
  if (
    field.includes("years of experience") ||
    field.includes("total experience")
  ) {
    return {
      value:
        resume.totalExperience || "2",
      confidence: 0.8
    };
  }

  // Default fallback
  return {
    value: "",
    confidence: 0
  };
};

module.exports = semanticMap;
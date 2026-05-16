console.log("AI Workday Extension Loaded");

// ==========================================
// FETCH RESUME DATA
// ==========================================

const getResumeData = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/resume/latest"
    );

    const data = await response.json();

    console.log("RESUME API:", data);

    return data.data;

  } catch (error) {

    console.log(
      "FETCH ERROR:",
      error
    );

    return null;
  }
};

// ==========================================
// FIELD MAPPING
// ==========================================

const mapField = (
  label,
  resumeData
) => {

  if (!label)
    return "";

  label =
    label.toLowerCase();

  console.log(
    "FIELD LABEL:",
    label
  );

  // FIRST NAME

  if (
    label.includes("first") ||
    label.includes("given")
  ) {

    return (
      resumeData.firstName ||
      ""
    );
  }

  // LAST NAME

  if (
    label.includes("last") ||
    label.includes("family")
  ) {

    return (
      resumeData.lastName ||
      ""
    );
  }

  // EMAIL

  if (
    label.includes("email")
  ) {

    return (
      resumeData.email ||
      ""
    );
  }

  // PHONE

  if (
    label.includes("phone") ||
    label.includes("mobile")
  ) {

    return (
      resumeData.phone ||
      ""
    );
  }

  // LINKEDIN

  if (
    label.includes("linkedin")
  ) {

    return (
      resumeData.linkedin ||
      ""
    );
  }

  // GITHUB

  if (
    label.includes("github")
  ) {

    return (
      resumeData.github ||
      ""
    );
  }

  // LOCATION

  if (
    label.includes("location") ||
    label.includes("city") ||
    label.includes("address")
  ) {

    return (
      resumeData.location ||
      ""
    );
  }

  // COMPANY

  if (
    label.includes("company") ||
    label.includes("employer")
  ) {

    return (
      resumeData.experience?.[0]
        ?.company || ""
    );
  }

  // JOB TITLE

  if (
    label.includes("job title") ||
    label.includes("designation") ||
    label.includes("role")
  ) {

    return (
      resumeData.experience?.[0]
        ?.title || "Software Engineer"
    );
  }

  // UNIVERSITY

  if (
    label.includes("school") ||
    label.includes("university") ||
    label.includes("college") ||
    label.includes("education")
  ) {

    return (
      resumeData.education?.[0]
        ?.college || ""
    );
  }

  // GPA

  if (
    label.includes("gpa") ||
    label.includes("cgpa") ||
    label.includes("grade")
  ) {

    return "7.5";
  }

  // SKILLS

  if (
    label.includes("skill")
  ) {

    return (
      resumeData.skills?.join(
        ", "
      ) || ""
    );
  }

  // CERTIFICATIONS

  if (
    label.includes(
      "certification"
    )
  ) {

    return (
      resumeData.certifications?.join(
        ", "
      ) || ""
    );
  }

  // URL

  if (
    label.includes("url")
  ) {

    return (
      resumeData.linkedin ||
      resumeData.github ||
      ""
    );
  }

  return "";
};

// ==========================================
// GET FIELD LABEL
// ==========================================

const getFieldLabel = (
  element
) => {

  // aria-label

  const aria =
    element.getAttribute(
      "aria-label"
    );

  if (aria)
    return aria;

  // placeholder

  if (
    element.placeholder
  ) {

    return element.placeholder;
  }

  // label for=id

  if (element.id) {

    const label =
      document.querySelector(
        `label[for="${element.id}"]`
      );

    if (label) {

      return (
        label.innerText
      );
    }
  }

  // nearest label

  const parent =
    element.closest("div");

  if (parent) {

    const label =
      parent.querySelector(
        "label"
      );

    if (label) {

      return (
        label.innerText
      );
    }
  }

  return "";
};

// ==========================================
// REACT SAFE INPUT FILLING
// ==========================================

const simulateTyping =
  async (
    element,
    value
  ) => {

    if (
      !element ||
      !value
    )
      return;

    element.focus();

    const nativeInputValueSetter =
      Object.getOwnPropertyDescriptor(
        window.HTMLInputElement
          .prototype,
        "value"
      )?.set;

    const nativeTextAreaSetter =
      Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement
          .prototype,
        "value"
      )?.set;

    if (
      element.tagName ===
      "TEXTAREA"
    ) {

      nativeTextAreaSetter.call(
        element,
        value
      );

    } else {

      nativeInputValueSetter.call(
        element,
        value
      );
    }

    element.dispatchEvent(
      new Event("input", {
        bubbles: true,
      })
    );

    element.dispatchEvent(
      new Event("change", {
        bubbles: true,
      })
    );

    element.dispatchEvent(
      new KeyboardEvent(
        "keydown",
        {
          bubbles: true,
          cancelable: true,
          key: "a",
        }
      )
    );

    element.dispatchEvent(
      new KeyboardEvent(
        "keyup",
        {
          bubbles: true,
          cancelable: true,
          key: "a",
        }
      )
    );

    element.blur();

    console.log(
      "FILLED:",
      value
    );
  };

// ==========================================
// FILL INPUTS + TEXTAREAS
// ==========================================

const fillInputs =
  async (
    resumeData
  ) => {

    const inputs =
      document.querySelectorAll(
        "input, textarea"
      );

    console.log(
      "INPUTS FOUND:",
      inputs.length
    );

    for (const input of inputs) {

      const label =
        getFieldLabel(
          input
        );

      const value =
        mapField(
          label,
          resumeData
        );

      if (value) {

        console.log(
          "FILLING:",
          label,
          value
        );

        await simulateTyping(
          input,
          value
        );
      }
    }
  };

// ==========================================
// FILL DROPDOWNS
// ==========================================

const fillDropdowns =
  async (
    resumeData
  ) => {

    const selects =
      document.querySelectorAll(
        "select"
      );

    console.log(
      "SELECTS FOUND:",
      selects.length
    );

    for (const select of selects) {

      const label =
        getFieldLabel(
          select
        );

      const value =
        mapField(
          label,
          resumeData
        );

      if (!value)
        continue;

      for (
        const option of
        select.options
      ) {

        if (
          option.text
            .toLowerCase()
            .includes(
              value.toLowerCase()
            )
        ) {

          select.value =
            option.value;

          select.dispatchEvent(
            new Event(
              "change",
              {
                bubbles: true,
              }
            )
          );

          console.log(
            "SELECTED:",
            option.text
          );
        }
      }
    }
  };

// ==========================================
// MAIN AUTOFILL
// ==========================================

const autofillForm =
  async () => {

    console.log(
      "STARTING AUTOFILL"
    );

    const resumeData =
      await getResumeData();

    console.log(
      "RESUME DATA:",
      resumeData
    );

    if (!resumeData) {

      alert(
        "No Resume Data Found"
      );

      return;
    }

    await fillInputs(
      resumeData
    );

    await fillDropdowns(
      resumeData
    );

    alert(
      "Autofill Completed"
    );
  };

// ==========================================
// OBSERVE DYNAMIC DOM
// ==========================================

const observer =
  new MutationObserver(
    () => {

      console.log(
        "DOM UPDATED"
      );
    }
  );

observer.observe(
  document.body,
  {
    childList: true,
    subtree: true,
  }
);

// ==========================================
// MESSAGE LISTENER
// ==========================================

chrome.runtime.onMessage.addListener(
  async (
    request
  ) => {

    if (
      request.action ===
      "AUTOFILL"
    ) {

      await autofillForm();
    }
  }
);
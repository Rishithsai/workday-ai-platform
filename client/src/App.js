import React, {
  useState
} from "react";

import axios from "axios";

function App() {

  const [file, setFile] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const handleUpload =
    async () => {

      if (!file) {
        alert(
          "Select Resume"
        );
        return;
      }

      const formData =
        new FormData();

      formData.append(
        "resume",
        file
      );

      try {

        const response =
          await axios.post(
            "http://localhost:5000/api/resume/upload",
            formData
          );

        console.log(
          response.data
        );

        // =========================
        // SAVE TO CHROME STORAGE
        // =========================

        if (
          window.chrome &&
          chrome.storage
        ) {

          chrome.storage.local.set({
            resumeData:
              response.data
                .structuredData
          });

          console.log(
            "Resume Saved To Chrome Storage"
          );
        }

        setMessage(
          "Resume Uploaded Successfully"
        );

      } catch (error) {

        console.log(error);

        setMessage(
          "Upload Failed"
        );
      }
    };

  return (

    <div
      style={{
        padding: "40px"
      }}
    >

      <h1>
        AI Workday Platform
      </h1>

      <input
        type="file"
        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }
      />

      <br />
      <br />

      <button
        onClick={
          handleUpload
        }
      >
        Upload Resume
      </button>

      <p>{message}</p>

    </div>
  );
}

export default App;
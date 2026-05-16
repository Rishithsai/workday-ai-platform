import { useState } from 'react';
import axios from 'axios';

export default function ResumeUpload() {
  const [loading, setLoading] = useState(false);

  const uploadResume = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append('resume', file);

    setLoading(true);

    const response = await axios.post(
      'http://localhost:5000/api/resume/upload',
      formData
    );

    localStorage.setItem(
      'resume',
      JSON.stringify(response.data)
    );

    setLoading(false);

    alert('Resume uploaded');
  };

  return (
    <div>
      <h2>Upload Resume</h2>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={uploadResume}
      />

      {loading && <p>Parsing...</p>}
    </div>
  );
}
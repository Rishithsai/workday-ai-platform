const axios = require("axios");

const askAI = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/gpt2",
      {
        inputs: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      error.response?.data || error.message
    );
  }
};

module.exports = askAI;
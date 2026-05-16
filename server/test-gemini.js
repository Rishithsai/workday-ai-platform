require("dotenv").config();

const model = require("./services/geminiService");

async function test() {
  const result =
    await model.generateContent(
      "Say hello"
    );

  console.log(
    result.response.text()
  );
}

test();
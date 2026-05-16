require("dotenv").config();

const askAI = require(
  "./services/huggingfaceService"
);

async function test() {
  const result = await askAI(
    "Say hello"
  );

  console.log(result);
}

test();
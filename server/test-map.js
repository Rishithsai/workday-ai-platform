const semanticMap = require(
  "./services/semanticService"
);

const resume = require(
  "./data/resume.json"
);

console.log(
  semanticMap(
    "Given Name",
    resume
  )
);

console.log(
  semanticMap(
    "Email Address",
    resume
  )
);

console.log(
  semanticMap(
    "Skills",
    resume
  )
);
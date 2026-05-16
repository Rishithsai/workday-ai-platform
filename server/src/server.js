const express =
  require("express");

const cors =
  require("cors");

const dotenv =
  require("dotenv");

const connectDB =
  require("../config/db");

const resumeRoutes =
  require("../routes/resumeRoutes");

dotenv.config();

connectDB();

const app =
  express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/resume",
  resumeRoutes
);

app.get(
  "/",
  (req, res) => {

    res.send(
      "Server Running"
    );
  }
);

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {

    console.log(
      `Server running on ${PORT}`
    );
  }
);
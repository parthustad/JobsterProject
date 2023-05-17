const express = require("express");
require("express-async-errors");

const app = express();
require("dotenv").config();

const connect = require("./database/connect");
const { errorHandlerMiddleware } = require("./middleware/error-handle");
const authMiddleware = require("./middleware/authMiddleware");

app.use(express.json());
const jobRoutes = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/v1/jobs/", authMiddleware, jobRoutes);
app.use("/api/v1/", userRoutes);

app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await connect(process.env.MONGO_URL);
    app.listen(3000, () => {
      console.log("Mongo Connected and HTTP Server Started");
    });
  } catch (error) {
    console.log(error);
  }
};

start();

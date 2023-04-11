const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require("cors");
const serverless = require("serverless-http");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

module.exports.handler = serverless(app);

const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require("cors");
const serverlessExpress = require("@vendia/serverless-express");
const PORT = 5000;

if (process.env.NODE_ENV !== "production") {
  console.log(process.env.NODE_ENV);
  app.listen(PORT, () => {
    console.log("server is running");
  });
} else {
  const server = serverlessExpress.createServer(app);
  exports.handler = (event, context) =>
    serverlessExpress.proxy(server, event, context);
}

// ローカル確認用
// app.listen(PORT);
// console.log("Loading server.js...");
// exports.handler = serverlessExpress({ app });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

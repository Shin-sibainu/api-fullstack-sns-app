const express = require("express");
const app = express();
require("dotenv").config();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require("cors");
// const serverlessExpress = require("@vendia/serverless-express");
// const awsServerlessExpress = require("aws-serverless-express");
// const server = awsServerlessExpress.createServer(app);
const serverless = require("serverless-http");
const PORT = 5000;

// ローカル確認用
// app.listen(PORT);
// console.log("Loading server.js...");
// exports.handler = serverlessExpress({ app });

//https://nkgr.hatenablog.com/entry/2018/07/01/210000
//prismaをserverlessデプロイ
//https://kiririmode.hatenablog.jp/entry/20220619/1655622443
//prisma公式
//https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-aws-lambda

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log("server is running");
  });
} else {
  // exports.handler = (event, context) => {
  //   awsServerlessExpress.proxy(server, event, context);
  // };
  module.exports.handler = serverless(app);
}

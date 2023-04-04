const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require("cors");

const PORT = 5000;

//https://github.com/Shin-sibainu/notion-clone-server/tree/main/src/v1

// app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => console.log("server running"));

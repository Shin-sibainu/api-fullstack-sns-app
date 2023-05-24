const express = require("express");
const app = express();
require("dotenv").config();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require("cors");
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

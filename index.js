const express = require("express");
const env = require("dotenv");
env.config({ path: "./.env" });
const app = express();
const userRoute = require("./routes/users");
const eventRoute = require("./routes/events");
const cors = require("cors");
app.use(cors());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.get("/", (req, res) => {
  res
    .cookie("test", "test", {
      httpOnly: true,
      expires: new Date(Date.now() + 6000),
      secure: true,
    })
    .clearCookie("test")
    .json({
      message: "Hello from server",
      status: 200,
    });
});
//middlewares
app.use(express.json());
//connection
require("./db");
const port = process.env.PORT || 8000;
app.use("/api", userRoute);
app.use("/api", eventRoute);
//mongo db connection
app.listen(port, () => {
  console.log(`Server is running on port ` + port);
});

const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose.set("strictQuery", true);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useUnifiedToplogy:true,
    // useCreateIndex:true
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

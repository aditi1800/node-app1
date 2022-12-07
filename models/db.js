const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);
console.log(process.env.DB_URL);
console.log(process.env.DB_USERNAME);
require("./employee.model");

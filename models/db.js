const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://aditi:aditi@cluster0.iph4fgv.mongodb.net/demo?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

require("./employee.model");

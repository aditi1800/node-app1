const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://admin:test1234@mongo.aditi-poc.svc.cluster.local:27017",
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

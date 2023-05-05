const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL);

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("error connecting to database");
});
connection.on("connected", () => {
  console.log("connected to mongoDB database");
});

module.exports = connection;

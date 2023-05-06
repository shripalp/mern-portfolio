const express = require("express");

const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig.js");

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
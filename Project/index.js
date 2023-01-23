const express = require("express");
const app = express();
const PORT = 4000;

require("dotenv").config();

app.use(express.json());

app.use(express.static("./client/public"));
app.set("view engine", "ejs");

app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

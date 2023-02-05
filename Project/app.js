const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./server/routes/users");
const profileRoutes = require("./server/routes/profiles");
const sitterRoutes = require("./server/routes/sitterposts");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

// const multer = require("../library/multer");

// const cloudinary = require("../library/cloudinary");
require("dotenv").config();

//cookie
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/client/public")));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
app.set("view engine", "ejs");

app.use(morgan("dev"));
mongoose.connect(process.env.MONGO_URL, (error) => {
  if (error) {
    console.log("There was an error", error);
  } else {
    console.log("Database Succesfully Connected");
  }
});

app.get("/index", (req, res) => {
  res.render("pages/index", { title: "Home" });
});

app.get("/login", (req, res) => {
  res.render("pages/login", { title: "Login" });
});

// app.get("/register", (req, res) => {
//   res.render("pages/register", { title: "Register" });
// });

// app.get("/createpetowner", (req, res) => {
//   res.render("pages/createPetOwner");
// });

app.get("/createPetSitter", (req, res) => {
  res.render("pages/createPetSitter");
});

// app.get("/petOwnerPost", (req, res) => {
//   res.render("pages/petOwnerPost");
// });

app.get("/petSitterPost", (req, res) => {
  res.render("pages/sitterPost");
});

function userLogger(req, res, next) {
  console.log("Loading User requests....");
  next(); // Pass the control to the next middleware
}

function postLogger(req, res, next) {
  console.log("Loading Post requests....");
  next();
}

function profileLogger(req, res, next) {
  console.log("Loading Profile Post requests....");
  next();
}
app.use((req, res, next) => {
  next();
});

// We will use middleware
app.use("/api/v1/users", userLogger, userRoutes);
app.use("/api/v1/sitterposts", postLogger, sitterRoutes);

app.use("/profile", profileRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// run npm start

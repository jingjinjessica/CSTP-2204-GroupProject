const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./server/routes/users");
const profileRoutes = require("./server/routes/profiles");
const sitterRoutes = require("./server/routes/sitterposts");
const ownerRoutes = require("./server/routes/ownerposts");
const listRoutes = require("./server/routes/lists");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

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
  res.render("pages/index");
});
app.get("/login", (req, res) => {
  res.render("pages/login");
});
app.get("/register", (req, res) => {
  res.render("pages/register");
});

app.get("/petOwnerPost", (req, res) => {
  res.render("pages/petOwnerPost");
});

app.get("/petSitterPost", (req, res) => {
  res.render("pages/sitterPost");
});

app.get("/sitterPostInfo", (req, res) => {
  res.render("pages/sitterPostInfo");
});

app.get("/ownerPostInfo", (req, res) => {
  res.render("pages/ownerPostInfo");
});

app.get("/list/:postid", async function (req, res, next) {
  const { postid } = req.params;
  console.log("this is post id from server", postid);
  try {
    const post = await PetPost.findById(postid);
    console.log("this is post from server", post);
    //res.status(200).json(post);
    res.render("[postid]", { post });
  } catch (error) {
    res.status(500).json(error);
  }
  // if (!post) {
  //   res.status(500).json(error);
  // }
});

function userLogger(req, res, next) {
  console.log("Loading User requests....");
  next(); // Pass the control to the next middleware
}

app.use((req, res, next) => {
  next();
});

// We will use middleware
app.use("/api/v1/users", userLogger, userRoutes);
app.use("/users", userRoutes);
app.use("/api/v1/sitterposts", sitterRoutes);
app.use("/api/v1/ownerposts", ownerRoutes);
app.use("/profile", profileRoutes);
app.use("/list", listRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// run npm start

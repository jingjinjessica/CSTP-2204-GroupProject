"use strict";

var express = require("express");

var app = express();
var PORT = 3000;

var mongoose = require("mongoose");

var path = require("path");

var userRoutes = require("./server/routes/users");

var profileRoutes = require("./server/routes/profiles");

var sitterRoutes = require("./server/routes/sitterposts");

var ownerRoutes = require("./server/routes/ownerposts");

var listRoutes = require("./server/routes/lists");

var postRoutes = require("./server/routes/posts");

var cookieParser = require("cookie-parser");

var morgan = require("morgan");

var bodyParser = require("body-parser");

var fileUpload = require("express-fileupload");

var petPost = require("./server/model/PetPost");

var sitterPost = require("./server/model/PetSitterPost");

var profile = require("./server/model/Profile");

var http = require("http");

var socketio = require("socket.io");

var middleware = require("./middleware/middleware");

require("dotenv").config();

var server = http.createServer(app);
var io = socketio(server); //connect socket io

io.on("connection", function (socket) {
  console.log("It's connected");
  socket.emit("message", "Hello");
}); //cookie

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"](path.join(__dirname + "/client/public")));
app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true
}));
app.use(fileUpload());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(morgan("dev"));
mongoose.connect(process.env.MONGO_URL, function (error) {
  if (error) {
    console.log("There was an error", error);
  } else {
    console.log("Database Succesfully Connected");
  }
});
app.get("/index", function (req, res) {
  res.render("pages/index");
});
app.get("/login", function (req, res) {
  res.render("pages/login");
});
app.get("/register", function (req, res) {
  res.render("pages/register");
});
app.get("/chat", function (req, res) {
  res.render("pages/chat");
});
app.get("/petOwnerPost", function (req, res) {
  res.render("pages/petOwnerPost", {
    post: {
      title: "",
      desc: "",
      startDate: "",
      endDate: "",
      _id: ""
    },
    btnName: "Save"
  });
});
app.get("/petSitterPost", function (req, res) {
  res.render("pages/sitterPost", {
    post: {
      title: "",
      rate: "",
      services: "",
      experience: "",
      _id: ""
    },
    btnName: "Save"
  });
}); // app.get("/post", (req, res) => {
//   // Check if the user is authenticated
//   const token = req.cookies["access-token"];
//   let userData = null;
//   if (token) {
//     try {
//       // Verify the JWT token and get the user data
//       userData = jwt.verify(token, process.env.SECRET_KEY);
//     } catch (error) {
//       // If the JWT token is invalid, do nothing
//     }
//   }
//   // Render the post page and pass the user data as a variable
//   res.render("post", { userData });
// });
// app.get("/sitterPostInfo", (req, res) => {
//   res.render("pages/sitterPostInfo");
// });
// app.get("/ownerPostInfo", (req, res) => {
//   res.render("pages/ownerPostInfo");
// });
// app.get("/test", (req, res) => {
//   res.render("pages/test");
// });
// app.get("/listSitterPost", (req, res) => {
//   res.render("pages/listSitterPost");
// });
// app.get("/ownerlist/:postid", async function (req, res, next) {
//   const { postid } = req.params;
//   console.log("this is post id from server", postid);
//   try {
//     const post = await petPost.findById(postid);
//     const petowner = post.userID;
//     const owner = await profile.findOne({ userID: petowner });
//     res.render("[postid]", { post, owner });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

function userLogger(req, res, next) {
  console.log("Loading User requests....");
  next(); // Pass the control to the next middleware
}

app.use(function (middleware, next) {
  next();
}); // We will use middleware

app.use("/api/v1/users", userLogger, userRoutes);
app.use("/users", userRoutes);
app.use("/api/v1/sitterposts", sitterRoutes);
app.use("/api/v1/ownerposts", ownerRoutes);
app.use("/post", postRoutes);
app.use("/postinfo", postRoutes);
app.use("/profile", profileRoutes);
app.use("/list", listRoutes);
app.use("/api/v1/profile/getprofile", profileRoutes);
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
}); // run npm start
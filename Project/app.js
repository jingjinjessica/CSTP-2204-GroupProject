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
const postRoutes = require("./server/routes/posts");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const petPost = require("./server/model/PetPost");
const sitterPost = require("./server/model/PetSitterPost");
const profile = require("./server/model/Profile");
const http = require("http");
// const middleware = require("./middleware/middleware");
const chatroomRoutes = require("./server/routes/message");

require("dotenv").config();

//cookie
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/client/public")));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

app.set("views", path.join(__dirname, "views"));
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

// FAKE DATA FOR CHAT TESTING

// async function getCurrProfile() {
//   const response = await fetch("/profile/getCurrUserProfile", {
//     method: "get",
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${JSON.parse(
//         localStorage.getItem("access-token")
//       )}`,
//     },
//   });
//   return await response.json();
// }

// console.log( getCurrProfile());
//const currUserProfile = await response.json();

const renderedData = encodeURIComponent(JSON.stringify(peopleList));

// app.get("/message", (req, res) => {
//   res.render("pages/message", { peopleList: peopleList, renderedData });
// });

app.get("/petOwnerPost", (req, res) => {
  res.render("pages/petOwnerPost", {
    post: { title: "", desc: "", startDate: "", endDate: "", _id: "" },
    btnName: "Save",
  });
});

app.get("/petSitterPost", (req, res) => {
  res.render("pages/sitterPost", {
    post: { title: "", rate: "", services: "", experience: "", _id: "" },
    btnName: "Save",
  });
});

// app.get("/post", (req, res) => {
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

// app.use(middleware.authMiddleware);

// We will use middleware
app.use("/api/v1/users", userLogger, userRoutes);
app.use("/users", userRoutes);
app.use("/api/v1/sitterposts", sitterRoutes);
app.use("/api/v1/ownerposts", ownerRoutes);
app.use("/post", postRoutes);
app.use("/postinfo", postRoutes);
app.use("/profile", profileRoutes);
app.use("/list", listRoutes);
app.use("/api/v1/profile/getprofile", profileRoutes);
app.use("/message", chatroomRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// run npm start

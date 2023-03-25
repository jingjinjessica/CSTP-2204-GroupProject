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
const session = require('express-session');



require("dotenv").config();

//cookie
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/client/public")));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

app.set('views', path.join(__dirname, 'views'));
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
  res.render("pages/index",{locals:{session:{loggedin:true}}});
});
app.get("/login", (req, res) => {
  res.render("pages/login");
});
app.get("/register", (req, res) => {
  res.render("pages/register");
});

app.get("/petOwnerPost", (req, res) => {
  res.render("pages/petOwnerPost",{post:{title:"",desc:"",startDate:"",endDate:"", _id:""}, btnName:"Save",locals:{session:{loggedin:true}}});
});

app.get("/petSitterPost", (req, res) => {
  res.render("pages/sitterPost",{post:{title:"",rate:"",services:"",experience:"", _id:""}, btnName:"Save",locals:{session:{loggedin:true}}});
});

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

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));
app.use((req, res, next) => {
  res.locals.session = req.cookies;
  next();
});

app.get('/', function(req, res) {
  res.render('pages/auth');
});


/*  PASSPORT SETUP  */

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '400184236994-pk2n0ht5cgck60qf7g6imt85crv7tbp8.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback/"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback/', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect(`/users/googlelogin?email=${req.user.emails[0].value}` );
  });

// We will use middleware
app.use("/api/v1/users", userLogger, userRoutes);
app.use("/users", userRoutes);
app.use("/api/v1/sitterposts", sitterRoutes);
app.use("/api/v1/ownerposts", ownerRoutes);
app.use("/post",postRoutes);
app.use("/postinfo",postRoutes);
app.use("/profile", profileRoutes);
app.use("/list", listRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// run npm start

const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const path = require('path');
const userRoutes = require("./server/routes/users");
//const postRoute = require("./server/routes/posts");
//const editProfileRoute = require("./server/routes/editprofile");
const morgan = require("morgan");
const bodyParser = require('body-parser');
require("dotenv").config();



app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname + '/client/public')))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.set("view engine", "ejs");

app.use(morgan("dev"));
mongoose.connect(process.env.MONGO_URL, (error) => {
  if (error) {
    console.log("There was an error", error);
  } else {
    console.log("Database Succesfully Connected");
  }
});


app.get('/index', (req, res) => {
  res.render('pages/index', { 'title': 'Home', })
})

app.get('/login', (req, res) => {
  res.render('pages/login', { 'title': 'Login' })
})

app.get('/register', (req, res) => {
  res.render('pages/register', { 'title': 'Register' })
})


app.get('/createPetOwner', (req, res) => {
  res.render('pages/createPetOwner')
})

app.get('/createPetSitter', (req, res) => {
  res.render('pages/createPetSitter')
})


function userLogger(req, res, next) {
  console.log("Loading User requests....");
  next(); // Pass the control to the next middleware
}

function postLogger(req, res, next) {
  console.log("Loading Post requests....");
  next();
}
app.use((req, res, next) => {
  next();
});

// We will use middleware
app.use("/api/v1/users", userLogger, userRoutes);
//app.use("/api/v1/posts", postLogger, postRoute);
//app.use("/api/v1/editprofile", editProfileRoute);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// run npm start
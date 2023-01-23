const express = require("express");
const app = express();
const PORT = 3000;
const path = require('path')

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname + '/client/public')))
// app.use(express.static("/client/public"));
app.set("view engine", "ejs");

app.use(morgan("dev"));

app.get('', (req, res) => {
  res.render('index')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// run npm start
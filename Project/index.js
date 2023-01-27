const express = require("express");
const app = express();
const PORT = 3000;
const path = require('path')

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname + '/client/public')))
// app.use(express.static("/client/public"));
app.set("view engine", "ejs");

// app.use(morgan("dev"));

app.get('/index', (req, res) => {
  res.render('pages/index', { 'title': 'Home', })
})

app.get('/login', (req, res) => {
  res.render('pages/login', { 'title': 'Login' })
})

app.get('/register', (req, res) => {
  res.render('pages/register', { 'title': 'Register' })
})

app.get('/test', (req, res) => {
  res.render('pages/test')
})

app.get('/test2', (req, res) => {
  res.render('pages/test2', {'title': "test2"})
})

app.get('/dashboard', (req, res) => {
  res.render('pages/dashboard', {'title': 'Dashboard'})
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// run npm start
const jwt = require("jsonwebtoken"); // This Library will help us give and verify access tokens

function authMiddleware(req, res, next) {
  // Check if the current URL is the login or register page
  const isLoginPage = req.path === "/login";
  const isRegisterPage = req.path === "/register";

  // Skip authentication for the login and register pages
  if (isLoginPage || isRegisterPage) {
    return next();
  }

  const token = req.cookies["access-token"];
  let userData = null;
  if (token) {
    try {
      userData = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      // If the JWT token is invalid, do nothing
    }
  }

  if (!res.locals) {
    res.locals = {};
  }

  // Add the user data to the res.locals object
  res.locals.user = userData;
  console.log(userData);

  // Add the user data to the request object
  // res.local.user = userData;
  // req.userData = userData;

  // Check if the user is authenticated
  // if (!userData) {
  //   // If the user is not authenticated, redirect to login
  //   return res.redirect("/login");
  // }

  // If the user is authenticated, continue to the next middleware or route handler
  next();
}

module.exports = {
  authMiddleware,
};

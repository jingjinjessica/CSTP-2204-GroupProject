
function checkUserLoggedIn(event) {
      if (!userIsLoggedIn()) {
        event.preventDefault();
        window.location.href = '/login'; 
        return false;
      }
      return true;
}

function userIsLoggedIn() {
  const token = req.cookies["access-token"];
  if (!token) {
    return false; // No token found, user is not logged in
  }
  try {
    const decodedValues = jwt.verify(token, process.env.SECRET_KEY);
    // Check if decodedValues contains expected properties indicating that the user is authenticated
    if (decodedValues.email) {
      return true; // User is logged in
    }
  } catch (error) {
    console.error(error);
  }
  return false; // Token is invalid or doesn't contain expected properties, user is not logged in
}



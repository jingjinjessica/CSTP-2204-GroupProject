// let user = {};
// let baseUrl = "/api/v1";

// (function isAlreadyLoggedIN() {
//   let accessToken = JSON.parse(localStorage.getItem("access-token"));

//   if (accessToken) {
//     window.location.href = "/index";
//   }
// })();

// const setEmail = (event) => {
//   user.email = event.target.value;
// };

// const setPassword = (event) => {
//   user.password = event.target.value;
// };

// const submitLoginForm = async (event) => {
//   event.preventDefault();
//   //console.log(user);

//   try {
//     const response = await fetch(`${baseUrl}/users/login`, {
//       method: "post",
//       body: JSON.stringify(user),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const finalIncomingResponse = await response.json();

//     // We have to fix this
//     if (finalIncomingResponse.accessToken) {
//       // This is for saving user object in the browser storage
//       localStorage.setItem("user", JSON.stringify(finalIncomingResponse.data));

//       // This is for storing access token in the browser storage
//       localStorage.setItem(
//         "access-token",
//         JSON.stringify(finalIncomingResponse.accessToken)
//       );
//       // document.cookie = "access-token=" + JSON.stringify(finalIncomingResponse.accessToken);
//       window.location.href = "/index";
//     } else {
//       alert(finalIncomingResponse.message);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

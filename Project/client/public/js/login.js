
const sendResetRequest = async (event) =>{
  // event.preventDefault();
  const email = document.getElementById("form3Example3");
  if (email.value === ""){
    alert("please provide valid email");
    return;
  }

  const response = await fetch(`/users/resetrequest?email=${email.value}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  alert("Please check your email to reset your password then login again");
}
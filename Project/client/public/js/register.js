let user = {userType:"owner"};

const setEmail = (event) => {
  user.email = event.target.value;
};

const setPassword = (event) => {
  user.password = event.target.value;
};

const setConfPassword = (event) => {
  user.password = event.target.value;
};


const handleClick = (event) => {
  var type = document.getElementsByName('inlineRadioOptions');
    for (i=0;i<type.length;i++){
        if(type[i].checked){
         user.userType = type[i].value;
         return   
    }
  }
};

const validateFormRegister = () =>{
    let pwd = document.getElementById("regPwd").value;
    let cmpwd = document.getElementById("cnfPwd").value;
    let message = document.getElementById("message");

    if (pwd ==="" || cmpwd ==="" ){
      message.innerText = "The passwords can not be empty !";
        return false;
    }
    if (pwd !== cmpwd){
        message.innerText = "The passwords are not matched.";
        return false;
    }

    if (pwd.length < 6){
        message.innerText = "The passwords at least 6 chars.";
        return false;
    }

    let specialChars = "_#$!%^<>?&*-+=(){}[]|:~@";
    let anyUpperCase = false;
    let anySpecialChar = false;
    for(let i = 0; i < pwd.length; i++){
        let c = pwd.charAt(i);
        if (c.charCodeAt(0) >= 65 && c.charCodeAt(0) <=90 ){
            anyUpperCase = true;
        }
        else if(specialChars.indexOf(c)>=0){
            anySpecialChar = true;
        }
    }
    if(!anyUpperCase){
        message.innerText = "The passwords at least 1 upper case char.";
        return false;
    }

    if(!anySpecialChar){
        message.innerText = "The passwords at least 1 special char as _#$!%^<>?&*-+=(){}[]|:~@";
        return false; 
    }
    return true;
};

const submitRegisterForm = async (event) => {
  event.preventDefault();
  if(!validateForm()){
    return false;
  }
  //console.log(user);
  try {
    const response = await fetch("/api/v1/users/register", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response) {
      localStorage.removeItem("access-token");
      localStorage.removeItem("user");
      // cookie setup
      document.cookie = "";
      window.location.href = "/login";
    }
  } catch (error) {
    console.log(error);
  }
}

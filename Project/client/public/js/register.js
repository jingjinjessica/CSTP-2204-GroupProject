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


function handleClick(event){
    var type = document.getElementsByName('inlineRadioOptions');
    for (i=0;i<type.length;i++){
        if(type[i].checked)
         user.userType = type[i].value;
    }
};




const submitRegisterForm = async (event) => {
  event.preventDefault();
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
      window.location.href = "/login";
    }
  } catch (error) {
    console.log(error);
  }

};
let newOwnerPost = {};

const setTitle = (event) => {
  newOwnerPost.title = event.target.value;
};

const setDesc = (event) => {
  newOwnerPost.desc = event.target.value;
};

const setStart = (event) => {
  newOwnerPost.startdate = event.target.value;
};

const setEnd = (event) => {
  newOwnerPost.enddate = event.target.value;
};

const setPostId = (event) => {
  newOwnerPost.postId = event.target.value;
};

const postLoad = () =>{
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const startdate = document.getElementById("startdate").value;
  const enddate = document.getElementById("enddate").value;
  if (title !== ""){
    newOwnerPost.title = title;
  }
  if (desc !== ""){
    newOwnerPost.desc = desc;
  }
  if (startdate !== ""){
    newOwnerPost.startdate = startdate;
  }
  if (enddate !== ""){
    newOwnerPost.enddate = enddate;
  }
}

const ownerPost = async (event) => {
  event.preventDefault();
  //guard against empty input fields
  if (
    !newOwnerPost.title ||
    !newOwnerPost.desc ||
    !newOwnerPost.startdate ||
    !newOwnerPost.enddate
  ) {
    alert("Please fill all the fields");
    return;
  }
  newOwnerPost.postId = document.getElementById("postId").value;
  try {
    const response = await fetch("/api/v1/ownerposts/create", {
      method: "post",
      body: JSON.stringify(newOwnerPost),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access-token")
        )}`,
      },
    });
    if (response) {
      window.location.href = "/users/dashboard";
    }
  } catch (error) {
    console.log(error);
  }
};

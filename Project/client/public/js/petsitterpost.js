let newPetsitterPost = {};

const setSitterTitle = (event) => {
  newPetsitterPost.title = event.target.value;
};

const setRate = (event) => {
  newPetsitterPost.rate = event.target.value;
  //console.log(setRate);
};
const setCity = (event) => {
  newPetsitterPost.city = event.target.value;
  //console.log(setRate);
};
const setServices = (event) => {
  newPetsitterPost.services = event.target.value;
  //console.log(setServices);
};

const setExp = (event) => {
  newPetsitterPost.experience = event.target.value;
};

const setSitterPostId = (event) => {
  newPetsitterPost.postId = event.target.value;
};

const sitterPostLoad = () =>{
  const title = document.getElementById("title").value;
  const rate = document.getElementById("rate").value;
  const city = document.getElementById("city").value;
  const services = document.getElementById("services").value;
  const experience = document.getElementById("experience").value;
  if (title !== ""){
    newPetsitterPost.title = title;
  }
  if (rate !== ""){
    newPetsitterPost.rate = rate;
  }
  if (city !== ""){
    newPetsitterPost.city = city;
  }
  if (services !== ""){
    newPetsitterPost.services = services;
  }
  if (experience !== ""){
    newPetsitterPost.experience = experience;
  }
}

const sitterPost = async (event) => {
  event.preventDefault();
  //guard against empty input fields
  if (
    !newPetsitterPost.title ||
    !newPetsitterPost.rate ||
    !newPetsitterPost.city ||
    !newPetsitterPost.services ||
    !newPetsitterPost.experience
  ) {
    alert("Please fill all the fields");
    return;
  }
  newPetsitterPost.postId = document.getElementById("postId").value;
  try {
    const response = await fetch("/api/v1/sitterposts/create", {
      method: "post",
      body: JSON.stringify(newPetsitterPost),
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

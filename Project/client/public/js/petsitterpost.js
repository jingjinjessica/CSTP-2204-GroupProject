let newPetsitterPost = {};

const setTitle = (event) => {
  newPetsitterPost.title = event.target.value;
};

const setRate = (event) => {
  newPetsitterPost.rate = event.target.value;
  console.log(setRate);
};
const setServices = (event) => {
  newPetsitterPost.services = event.target.value;
  console.log(setServices);
};

const setExp = (event) => {
  newPetsitterPost.experience = event.target.value;
};

const sitterPost = async (event) => {
  event.preventDefault();
  //guard against empty input fields
  if (
    !newPetsitterPost.title ||
    !newPetsitterPost.rate ||
    !newPetsitterPost.services ||
    !newPetsitterPost.experience
  ) {
    alert("Please fill all the fields");
    return;
  }
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
      window.location.href = "/list/listsitterpost";
    }
  } catch (error) {
    console.log(error);
  }
};

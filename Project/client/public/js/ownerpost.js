let newOwnerPost = {};

const setTitle = (event) => {
  newOwnerPost.title = event.target.value;
};

const setProvince = (event) => {
  newOwnerPost.province = event.target.value;
};

const setCity = (event) => {
  newOwnerPost.city = event.target.value;
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

const ownerPost = async (event) => {
  event.preventDefault();
  //guard against empty input fields
  if (
    !newOwnerPost.title ||
    !newOwnerPost.province ||
    !newOwnerPost.city ||
    !newOwnerPost.desc ||
    !newOwnerPost.startdate ||
    !newOwnerPost.enddate
  ) {
    alert("Please fill all the fields");
    return;
  }
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
      window.location.href = "/list/listpost";
    }
  } catch (error) {
    console.log(error);
  }
};

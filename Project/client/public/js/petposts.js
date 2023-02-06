(function isNotLoggedIN() {
  let accessToken = JSON.parse(localStorage.getItem("access-token"));

  if (!accessToken) {
    alert("You are not logged in, so please login");
    window.location.href = "/login.html";
  }
})();

const showListOfPosts = async () => {
  const response = await fetch("/api/v1/ownerposts/allpetposts");
  const finalOutput = await response.json();
  console.log("this is petposts js");

  const getPostView = document.querySelector("#postsview");

  for (let i = 0; i < finalOutput.data.length; i++) {
    // let row = document.createElement("div");
    // row.classList.add("row");
    let column = document.createElement("div");
    column.classList.add("col-md-4");
    let card = document.createElement("div");
    card.classList.add("card");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    let cardCategory = document.createElement("span");
    cardCategory.classList.add("card-category");
    let cardDate = document.createElement("label");
    cardDate.classList.add("card-date");
    let dateIcon = document.createElement("img");
    dateIcon.classList.add("date-icon");
    dateIcon.setAttribute("src", "./image/icon-calendar.png");
    let nextLine = document.createElement("br");

    column.appendChild(card);
    const imgLink = document.createElement("a");
    imgLink.classList.add("img-link");
    imgLink.setAttribute("href", `/${finalOutput.data[i]._id}`);
    const cardImg = document.createElement("img");
    cardImg.classList.add("card-img-top");
    cardImg.setAttribute("src", finalOutput.data[i].photo);
    cardImg.setAttribute("width", 200);
    cardImg.setAttribute("height", 250);
    imgLink.appendChild(cardImg);
    cardBody.appendChild(imgLink);

    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardTitle.textContent = finalOutput.data[i].title;
    cardBody.appendChild(cardCategory);
    cardCategory.textContent = finalOutput.data[i].categories;
    cardBody.appendChild(nextLine);

    const date = new Date(finalOutput.data[i].createdAt);
    const dateFormat =
      "Create date: " +
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate();
    cardBody.appendChild(cardDate);
    cardDate.appendChild(dateIcon);
    cardDate.textContent = dateFormat;

    getPostView.appendChild(column);
  }
};

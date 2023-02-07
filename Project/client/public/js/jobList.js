const showListOfPosts = async () => {
    const response = await fetch("/api/v1/posts");
    const finalOutput = await response.json();

    const getListView = document.querySelector("#joblistsview");

    for (let i = 0; i < finalOutput.data.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card mb-3 post-card");

        let row = document.createElement("div");
        row.classList.add("row no-gutters");

        let column1 = document.createElement("div");
        column1.classList.add("col-md-4 img-area");

        const img = document.createElement("img");
        img.classList.add("card-img");
        img.setAttribute("id", "petimg");
        img.setAttribute("alt", `/`);
        img.setAttribute("src", `/`);

        let column2 = document.createElement("div");
        column2.classList.add("col-md-8")

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let cardTitle = document.createElement("h4");
        cardTitle.classList.add("card-title");

        let cardLocation = document.createElement("h5");
        cardLocation.classList.add("location");

        let cardInfo = document.createElement("p");
        cardInfo.classList.add("card-text info text-break");

        const learnMore = document.createElement("a");
        learnMore.classList.add("btn stretched-link learn-more");
        learnMore.setAttribute("id", "learnmore");
        learnMore.setAttribute("href", `/`);

        let cardDate = document.createElement("p");
        cardDate.classList.add("card-text card-date");

        let dateArea = document.createElement("small");
        dateArea.classList.add("text-muted");

        card.appendChild(row);
        row.appendChild(column1);
        column1.appendChild(img);
        row.appendChild(column2);
        column2.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        // cardTitle.textContent = finalOutput.data[i].title;
        cardBody.appendChild(cardLocation);
        cardBody.appendChild(cardInfo);
        cardInfo.appendChild(learnMore);
        cardDate.appendChild(dateArea);

        const date = new Date(finalOutput.data[i].createdAt);
        const dateFormat =
            "Create date: " +
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate();
        cardBody.appendChild(cardDate);
        cardDate.textContent = dateFormat;

        getListView.appendChild(card);
    }
};
showListOfPosts();
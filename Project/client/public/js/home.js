function renderCardCarousel(cardData) {
    const cardCarouselContainer = document.getElementById("card-carousel-container");

    // Loop through the card data and render each card using the EJS template
    cardData.forEach(data => {
        const cardHtml = ejs.render(data);
        cardCarouselContainer.insertAdjacentHTML("beforeend", cardHtml);
    });
}

const cardData = [
    {
        title: "Card 1",
        description: "This is the first card."
    },
    {
        title: "Card 2",
        description: "This is the second card."
    },
    {
        title: "Card 3",
        description: "This is the third card."
    }
];

renderCardCarousel(cardData);
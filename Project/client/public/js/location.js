// Set province and city data
const cities = {
    Alberta: ["Calgary", "Edmonton", "Red Deer", "Lethbridge"],
    "British Columbia": ["Burnaby", "Coquitlam",
        "North Vancouver", "Richmond",
        "Surrey", "Victoria", "Vancouver",
        "White Rock", "Williams Lake"],
    Manitoba: ["Winnipeg"],
    "New Brunswick": ["Fredericton", "Moncton"],
    "Nova Scotia": ["Halifax"],
    "Newfoundland and Labrador": ["St. John's"],
    "Northwest Territories": ["Yellowknife"],
    Nunavut: ["Iqaluit"],
    Ontario: ["Toronto", "Ottawa", "Windsor"],
    Quebec: ["Quebec City", "Montreal", "Laval"],
    "Prince Edward Island": ["Charlottetown"],
    Saskatchewan: ["Regina", "Saskatoon"],
    Yukon: ["Whitehorse"]
};

function optionCities() {
    const provinceDropdown = document.getElementById("province");
    const cityDropdown = document.getElementById("city");
    const selectedProvince = provinceDropdown.value; // set each province option of value

    // clear city options
    cityDropdown.innerHTML = '<option value="Choose">Choose...</option>';

    // Add city option to city dropdown if province is selected
    if (selectedProvince !== "Choose...") {
        for (let i = 0; i < cities[selectedProvince].length; i++) {
            const city = cities[selectedProvince][i];
            const option = document.createElement("option");
            option.value = city;
            option.innerHTML = city;
            cityDropdown.appendChild(option);
        }
    }
}

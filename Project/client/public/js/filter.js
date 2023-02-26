// Set province and city data
const citiesData = {
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

// Set pet type and weight data
const weightData = {
    Dog: [
        'less than 7 lbs',
        '7 - 10 lbs',
        '10 - 20 lbs',
        '20 - 30 lbs',
        '30 - 40 lbs',
        'Greater than 50 lbs'
    ],
    Cat: [
        'less than 5 lbs',
        '5 - 10 lbs',
        '10 - 20 lbs',
        'Greater than 20 lbs'
    ]
};

// Set pet age data
const ageData = {
    Dog: [
        "Puppy", "Adult", "Oldest"
    ],
    Cat: [
        "Kitty", "Adult", "Oldest"
    ]
};

function filterCities() {
    const provinceFilter = document.getElementById("province");
    const cityFilter = document.getElementById("city");
    const selectedFilterProvince = provinceFilter.value; // set each province option of value

    // clear city options
    cityFilter.innerHTML = '<option value="- Select City -">- Select City -</option>';

    // Add city option to city dropdown if province is selected
    if (selectedFilterProvince !== "- Select Province -") {
        for (let i = 0; i < citiesData[selectedFilterProvince].length; i++) {
            const city = cities[selectedFilterProvince][i];
            const option = document.createElement("option");
            option.value = city;
            option.innerHTML = city;
            cityFilter.appendChild(option);
        }
    }
}


function filterfeatures() {
    const typeFilter = document.getElementById("petType");
    const weightFilter = document.getElementById("weight");
    const ageFilter = document.getElementById("age");
    const selectedFilterType = typeFilter.value; // set each pet type option of value

    // clear weight options
    weightFilter.innerHTML = '<option value="- Select Weight -">- Select Weight -</option>';
    // clear age options
    ageFilter.innerHTML = '<option value="- Select Age -">- Select Age -</option>';

    // Add weight option to weight dropdown if pet type is selected
    if (selectedFilterType !== "- Select Type -") {
        for (let i = 0; i < weightData[selectedFilterType].length; i++) {
            const weight = weightData[selectedFilterType][i];
            const option = document.createElement("option");
            option.value = weight;
            option.innerHTML = weight;
            weightFilter.appendChild(option);
        }
    }

    // Add age option to age dropdown if pet type is selected
    if (selectedFilterType !== "- Select Type -") {
        for (let i = 0; i < ageData[selectedFilterType].length; i++) {
            const age = ageData[selectedFilterType][i];
            const option = document.createElement("option");
            option.value = age;
            option.innerHTML = age;
            ageFilter.appendChild(option);
        }
    }
}
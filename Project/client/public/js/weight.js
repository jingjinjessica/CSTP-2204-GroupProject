// Set pet type and weight data
const petWeightData = {
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

function optionWeight() {
    const typeDropdown = document.getElementById("petType");
    const weightDropdown = document.getElementById("petWeight");
    const selectedType = typeDropdown.value; // set each pet type option of value

    // clear weight options
    weightDropdown.innerHTML = '<option value="Choose">Choose...</option>';

    // Add weight option to city dropdown if pet type is selected
    if (selectedType !== "Choose...") {
        for (let i = 0; i < petWeightData[selectedType].length; i++) {
            const weight = petWeightData[selectedType][i];
            const option = document.createElement("option");
            option.value = weight;
            option.innerHTML = weight;
            weightDropdown.appendChild(option);
        }
    }
}

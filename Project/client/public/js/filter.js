// provinces = [
//     "Alberta", "British Columbia", "Manitoba",
//     "New Brunswick", "Newfoundland and Labrador",
//     "Nova Scotia", "Ontario", "Prince Edward Island",
//     "Quebec", "Saskatchewan"
// ];

// city = [
//     ["Toronto"], ["Quebec City", "Montreal"],
//     ["Halifax"], ["Fredericton", "Moncton"],
//     ["Winnipeg"], ["Victoria", "Vancouver"],
//     ["Charlottetown"], ["Regina", "Saskatoon"],
//     ["Edmonton", "Calgary"], ["St. John's"]
// ];

var cities = new Array(4);
cities[0] = new Array("Edmonton", "Calgary");
cities[1] = new Array("Victoria", "Vancouver");
cities[2] = new Array("Winnipeg");
cities[3] = new Array("Fredericton", "Moncton");
cities[4] = new Array("St. John's");
cities[5] = new Array("Halifax");
cities[6] = new Array("Toronto");
cities[7] = new Array("Charlottetown");
cities[8] = new Array("Quebec City", "Montreal");
cities[9] = new Array("Regina", "Saskatoon");
cities[10] = new Array("Yellowknife");
cities[11] = new Array("Whitehorse");
cities[12] = new Array("Iqaluit");

function selectCity(value) {

    var cityEle = document.getElementById("city");

    cityEle.options.length = 0;

    for (var i = 0; i < cities.length; i++) {
        if (value == i) {
            for (var j = 0; j < cities[i].length; j++) {
                var textNode = document.createTextNode(cities[i][j]);
                var opEle = document.createElement('option');
                opEle.appendChild(textNode);
                cityEle.appendChild(opEle);
            }
        }
    }
}
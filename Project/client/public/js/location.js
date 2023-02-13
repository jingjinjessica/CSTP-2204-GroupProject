// Level 2 linkage of provinces and cities

// set the array of cities for each province
var cities = new Array(12);
cities[0] = new Array("Edmonton", "Calgary");
cities[1] = new Array("Burnaby", "Coquitlam",
    "North Vancouver", "Richmond",
    "Surrey", "Victoria", "Vancouver",
    "White Rock", "Williams Lake");
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

// linkage provinces and cities
function selectCity(value) {

    // find the select id 
    var cityEle = document.getElementById("city");
    // set the option length
    cityEle.options.length = 0;

    // Get cities according to different provinces
    for (var i = 0; i < cities.length; i++) {
        // check the value of provinces to get city from array
        if (value == i) {
            // loop array to get correct element of cities
            for (var j = 0; j < cities[i].length; j++) {
                var textNode = document.createTextNode(cities[i][j]);
                var opEle = document.createElement('option');
                opEle.appendChild(textNode);
                cityEle.appendChild(opEle);
            }
        }
        document.getElementById('0').value = 'Alberta';
        document.getElementById('1').value = 'BritishColumbia';
        document.getElementById('2').value = 'Manitoba';
        document.getElementById('3').value = 'NewBrunswick';
        document.getElementById('4').value = 'NewfoundlandandLabrador';
        document.getElementById('5').value = 'Nova Scotia';
        document.getElementById('6').value = 'Ontario';
        document.getElementById('7').value = 'PrinceEdwardIsland';
        document.getElementById('8').value = 'Saskatchewan';
        document.getElementById('9').value = 'Quebec';
        document.getElementById('10').value = 'NorthwestTerritories';
        document.getElementById('11').value = 'Yukon';
        document.getElementById('12').value = 'Nunavut';
    }
}

document.getElementById('citySelect').disabled=true;
    
    // Function to make a fetch GET request
    function fetchGet(url) {
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.error(error));
    }

    // Populate the continent dropdown
    const continentSelect = document.getElementById("continentSelect");

    fetchGet("http://worldtimeapi.org/api/timezones")
        .then(timezones => {
            const continents = {};

            // Extract continents from time zone names
            timezones.forEach(timezone => {
                const parts = timezone.split("/");
                if (parts.length > 1) {
                    const continent = parts[0];
                    continents[continent] = true;
                }
            });

            for (const continent in continents) {
                const option = document.createElement("option");
                option.value = continent;
                option.textContent = continent;
                continentSelect.appendChild(option);
            }
        });

    // When the continent selection changes
    continentSelect.addEventListener("change", () => {
        const selectedContinent = continentSelect.value;
        const citySelect = document.getElementById("citySelect");

        // Make a request to get the cities for the selected continent
        fetchGet(`http://worldtimeapi.org/api/timezone/${selectedContinent}`)
            .then(data => {
                // Clear the city dropdown
                citySelect.innerHTML = '<option value="" class="rounded">Select City</option>';
                // Populate the city dropdown with cities from the response data
                data.forEach(city => {
                    const option = document.createElement("option");
                    option.value = city;
                    option.className = "dropdowns"
                    // Extract and display only the city name
                    const cityParts = city.split('/');
                    option.textContent = cityParts[cityParts.length - 1];
                    citySelect.appendChild(option);
                });
            });
    });

    const citySelect = document.getElementById("citySelect");
    citySelect.addEventListener("change", () => {
        const selectedCity = citySelect.value;
        const timeResult = document.getElementById("timeResult");
    
        // Extract the city name from the selectedCity value
        const cityParts = selectedCity.split('/');
        const cityName = cityParts[cityParts.length - 1];

        
        // Make a request to get the time for the selected city
        fetchGet(`http://worldtimeapi.org/api/timezone/${selectedCity}`)
            .then(data => {
                // Display the time information
                let result = data.datetime.toString();
                let time = result.substring(11,16)

                timeResult.textContent = `Time in ${cityName}: ${time}`;
            });
    });
function check(){
    if(document.getElementById('continentSelect').value!="")
        document.getElementById('citySelect').disabled=false;
    else
        document.getElementById('citySelect').disabled=true;
}
    
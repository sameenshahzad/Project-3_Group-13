// Define a function to get the sum of all components for a given feature
function getTotalComponent(feature) {
  return feature.properties.no2 + feature.properties.pm10 + feature.properties.pm2_5;
}

// Create a map
var map = L.map('map',{minZoom: 3}).setView([20, 12], 3);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18
}).addTo(map);

// Create a Heatmap layer
var heatLayer = L.heatLayer([], {
  radius: 25,
  blur: 15,
  maxZoom: 17,
  minOpacity: 0.6,
  gradient: {
    0.1: '#ccffcc',
    0.3: '#ffeda0',
    0.5: '#fed976',
    0.7: '#feb24c',
    0.9: '#fd8d3c',
    1.0: 'red'
  }
}).addTo(map);

// Retrieve data from the provided URL
fetch('/mapdatadic')
  .then(response => response.json())
  .then(data => {
    // Fetch country data from the URL
    fetch('/countrydata')
      .then(response => response.json())
      .then(countryData => {
        // Loop through each country in the data and calculate the sum of all components for each year
        data.forEach(function(country) {
          var countryName = country.country;
          var lat = getLatFromCountryName(countryName, countryData);
          var lng = getLngFromCountryName(countryName, countryData);
          country.features.forEach(function(feature) {
            var year = feature.year;
            var totalComponent = getTotalComponent(feature);
            if (!countryData[countryName]) {
              countryData[countryName] = {};
            }
            if (!countryData[countryName][year]) {
              countryData[countryName][year] = 0;
            }
            countryData[countryName][year] += totalComponent;
          });
          // Add the country's data to the Heatmap layer
          var totalComponent = Object.values(countryData[countryName]).reduce((a, b) => a + b);
          heatLayer.addLatLng([lat, lng], totalComponent/getTotalComponent(country.features[0]));
        });
      });
  });

// Function to get the latitude of a country based on its name
function getLatFromCountryName(countryName, countryData) {
  for (var i = 0; i < countryData.metadata.length; i++) {
    if (countryData.metadata[i].country === countryName) {
      return countryData.metadata[i].lat;
    }
  }
  return 0;
}

// Function to get the longitude of a country based on its name
function getLngFromCountryName(countryName, countryData) {
  for (var i = 0; i < countryData.metadata.length; i++) {
    if (countryData.metadata[i].country === countryName) {
      return countryData.metadata[i].lng;
    }
  }
  return 0;
}

// ---------------------------------------------------------------------------------------------------------------------------------------
// Store our API endpoint as url ---------------------------------------------------------------------------------------------------------
// Map Country Data:
var country_url = "/countrydata";

// Ambient Air Quality Data:
var AQ_url = "/mapdatadic";

var center = [-10, 0];
var zoom = 2;

// create the map and set its view
var map = L.map('map').setView(center, zoom);

// add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

// fetch the metadata from the URL
fetch(country_url)
  .then(response => response.json())
  .then(data => {
    const metadata = data.metadata;
    metadata.forEach(function(item) {
      const marker = L.circleMarker([51.505, -0.09], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 10
      });
      L.marker([item.lat, item.lng], { marker }).addTo(map)
        .bindPopup(`<div class="map-popup" style="width:50px">${item.country}</div>`);
    });
  })
  .catch(error => console.error(error))
// ---------------------------------------------------------------------------------------------------------------------------------------
// Store our API endpoint as url ---------------------------------------------------------------------------------------------------------
// Map Country Data:
var country_url = "/countrydata";

// Ambient Air Quality Data:
var AQ_url = "/mapdatadic";

// // DataPromise to get geoJSON Data from Urls
Promise.all([d3.json(country_url), d3.json(AQ_url)]).then(function([country_data, AQ_data]){
  createFeatures(country_data, AQ_data);
  console.log(AQ_data);
});
// ---------------------------------------------------------------------------------------------------------------------------------------
// Function to create Features (Markers and Bounderies) ----------------------------------------------------------------------------------
function createFeatures(earthquake, tectonicplates) {

  // Markers Function
  const marker_point = (feature, border) => L.circleMarker(border, {color:'#00000070',weight:1,fillColor:getColor(feature.geometry.coordinates[2]),fillOpacity:0.7,radius:feature.properties.mag**1.4});

  // Popup Function
  function marker_popup(feature, box) {
      box.bindPopup(
          `<div class="map-popup"><a href="${feature.properties.url}">${feature.properties.place}</a></div><br>
          <div class="map-popup-warning"> To obtain further details, please click on the location name.</div>
          <div class="map-popup-exp">
            <span>Time: </span> ${new Intl.DateTimeFormat().format(new Date(feature.properties.time))} <br>
            <span>Location: </span> ${feature.geometry.coordinates[0]} , ${feature.geometry.coordinates[1]} <br>
            <span>Depth: </span> ${feature.geometry.coordinates[2]} km <br>
            <span>Magnitude: </span> ${feature.properties.mag}
          </div>`)};

  // Create geoJSON layer for earthquake data
  var earthquake_gJsonLayer = L.geoJSON(earthquake.features, {
      onEachFeature: marker_popup,
      pointToLayer: marker_point
  });

  // Create geoJSON layer for tectonic plates
  var tectonicplates_gJsonLayer = L.geoJSON(tectonicplates.features, {style: {color: '#f10808',weight: 1}
  });
  // Create map with geoJSON layers & timeline object
  createMap(earthquake_gJsonLayer, tectonicplates_gJsonLayer);
};
// ---------------------------------------------------------------------------------------------------------------------------------------
// Map Structure Function ----------------------------------------------------------------------------------------------------------------
function createMap(earthquakes, tectonicplates) {

  // Create the General Layers.
  // Street Map
  var street_map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
  // Google Street Map
  var google_map=L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']})

  // Base Maps Object to Hold Maps Layers
  var baseMaps = {
    "Street"    : street_map,
    "Google"    : google_map,
  }
  // Create an Overlay Object to Hold overlay.
  var overlayMaps = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicplates
  };

  // Create Map
  var myMap = L.map("map", {
    center: [
      0, 0
    ],
    zoom: 3,
    layers: [street_map, tectonicplates] // Street Map and map2015 in Load 
  });

  // Layer Control.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: true,
    position: 'topright'
  }).addTo(myMap);

  // Create the legend control
  var legend = L.control({ position: 'topright' });
  legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'legend');
    var length = [-10, 10, 30, 50, 70, 90];
    div.innerHTML = '<p>Depth</p>' + length.map(function(element, i) {
      return '<span style="background:' + getColor(element + 1) + '">&nbsp&nbsp&nbsp&nbsp</span> ' + element + (length[i + 1] ? ' &ndash; ' + length[i + 1] + '<br>' : '+');
    }).join('');
    return div;
  }
};
//Depths colors
function getColor(depth) {
  const colorlist = ['#ff5f65', '#fca35d', '#fdb72a', '#f7db11', '#dcf400', '#a3f600']
  return depth > 90 ? colorlist[0] :
         depth > 70 ? colorlist[1] :
         depth > 50 ? colorlist[2] :
         depth > 30 ? colorlist[3] :
         depth > 10 ? colorlist[4] :
         colorlist[5];
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


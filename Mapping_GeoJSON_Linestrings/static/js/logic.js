// Add console.log to check to see if our code is working.
console.log("working");
// Create the map object with center at the San Francisco airport.
let map = L.map('mapid',{
        center: [30, 30],
        zoom: 2
});
//Add tilelayer1
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
//Add tilelayer2
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseLayer = {
    layer1 : light,
    layer2 : dark
};
 let myStyle = {
     color : "yellow",
     weight: 2
 }
// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/emmanuelbrim/Mapping_Earthquakes/main/torontoRoutes.json";
// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data,{ style : myStyle,      
      onEachFeature:function(feature, layer){layer.bindPopup(`<h3> Airport code: ${feature.properties.airline} <hr> <h4> Airport name: ${feature.properties.dst}`)}}).addTo(map);
});
//Add control layer
let control = L.control.layers(baseLayer).addTo(map);
// Add GeoJSON data.

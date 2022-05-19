// Add console.log to check to see if our code is working.
console.log("working");
// Create the map object with center at the San Francisco airport.
let map = L.map('mapid',{
        center: [30, -30],
        zoom: 3
});
//Add tilelayer1
let street = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });
//Add tilelayer2
let satelliteStreet = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseLayer = {
    streets : street,
    satellite : satelliteStreet
};
 let myStyle = {
     color : "yellow",
     weight: 2
 }
// Accessing the airport GeoJSON URL
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Grabbing our GeoJSON data.
d3.json(earthquakeData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
            pointToLayer: function(features, latlng) {return L.circleMarker(latlng).bindPopup(`<h2> ${features.properties.place} <h2>`)}
  }).addTo(map);
});
//Add control layer
let control = L.control.layers(baseLayer).addTo(map);
// Add GeoJSON data.

// Add console.log to check to see if our code is working.
console.log("working");
// Create the map object with center at the San Francisco airport.
let map = L.map('mapid',{
        center: [30, 30],
        zoom: 2
});
//Add tilelayer1
let day = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
//Add tilelayer2
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseLayer = {
    layer1 : day,
    layer2 : dark
};

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/emmanuelbrim/Mapping_Earthquakes/main/majorAirports.json";
// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data,{onEachFeature:function(feature, layer){layer.bindPopup(`<h3> Airport code: ${feature.properties.faa} <hr> <h4> Airport name: ${feature.properties.name}`)}}).addTo(map);
});
//Add control layer
let control = L.control.layers(baseLayer).addTo(map);
// Add GeoJSON data.
`let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};
//Use pointToLayer
L.geoJSON(sanFranAirport, {
    pointToLayer: function(feature, latlng){return L.marker(latlng).bindPopup("<h3>" + feature.properties.name + '</h3> <hr> <h4>' + feature.properties.city + feature.properties.country + '</h4>')}}).addTo(map);
// Use onEachFeature
L.geoJSON(sanFranAirport, {
    onEachFeature: function(feature, layer){return (layer.bindPopup("<h3>" + feature.properties.name + '</h3> <hr> <h4>' + feature.properties.city + feature.properties.country + '</h4>')}}).addTo(map);`
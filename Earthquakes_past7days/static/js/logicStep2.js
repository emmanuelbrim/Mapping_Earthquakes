// Add console.log to check to see if our code is working.
console.log("working");

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
// Create the map object with center at the San Francisco airport.
let map = L.map('mapid',{
    center: [30, -30],
    zoom: 3,
    layers : street
});
//  let Style = {
//    color : "yellow",
//    fillColor : "orange",
//    fillOpacity: 1.5,
//    weight: 2
//  }

// Accessing the airport GeoJSON URL
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Grabbing our GeoJSON data.
d3.json(earthquakeData).then(function(data) {
    console.log(data);
    function myStyle(feature) {
        return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: getColor(feature.properties.mag),
          color: "#000000",
          radius: getRadius(feature.properties.mag),
          stroke: true,
          weight: 0.5
        };
      }
      function getRadius(mag){
        if(mag === 0){return 1}
        return mag * 4};

    function getColor(mag){
    if(mag > 5){return "#ea2c2c"}
     else if (mag > 4){return "#ea822c"}
     else if (mag > 3){return "#ee9c00"}
     else if (mag > 2){return "#eecc00"}
     return "#d4ee00"
    }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
      pointToLayer : function(feature, latlng){return L.circleMarker(latlng).bindPopup(`<h2>Mag: ${feature.properties.mag} <hr> Location: ${feature.properties.place}</h2>`)},
      style: myStyle
}).addTo(map);
});
//Add control layer
let control = L.control.layers(baseLayer).addTo(map);
// Add GeoJSON data.

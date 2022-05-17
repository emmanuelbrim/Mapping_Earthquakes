// Add console.log to check to see if our code is working.
console.log("working");
let map = L.map('mapid').setView([40.7, -94.5], 4);
//let marker = L.marker([34.0522, -118.2437]).addTo(map);
// Get data from cities.js
  // Loop through the cities array and create one marker for each city.
  let cityData = cities
  cityData.forEach(function(city) {
    console.log(city)
    L.circleMarker(city.location,{radius:city.population/200000, color: "orange", fillColor:"yellow"})
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map);
});
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(map);
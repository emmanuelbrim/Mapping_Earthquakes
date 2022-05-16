// Add console.log to check to see if our code is working.
console.log("working");
let map = L.map('mapid').setView([34.0522, -118.2437], 14);
//let marker = L.marker([34.0522, -118.2437]).addTo(map);
L.circleMarker([34.0522, -118.2437], {
    radius: 300,
    color:"black",
    fillColor:"yellow"
 }).addTo(map);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
}).addTo(map);
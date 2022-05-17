// Add console.log to check to see if our code is working.
console.log("working");
// Create the map object with center at the San Francisco airport.
let map = L.map('mapid',{
        center: [30, 30],
        zoom: 2
});

// Add GeoJSON data.
let sanFranAirport =
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
//L.geoJSON(sanFranAirport, {
    //pointToLayer: function(feature, latlng){return L.marker(latlng).bindPopup(`<h3> ${feature.properties.name} </h3> <hr> <h4> ${feature.properties.city}, ${feature.properties.country} </h4>`)}}).addTo(map);
L.geoJSON(sanFranAirport,{onEachFeature:function(feature, layer){console.log(layer.feature);layer.bindPopup(`<h3>${feature.properties.faa}</h3><hr><h3>${feature.properties.name}</h3>`)}}).addTo(map);

    //Add layer
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
}).addTo(map);


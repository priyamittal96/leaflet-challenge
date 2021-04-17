console.log("working");


// tile layer as the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution: 'Map data',
    maxZoom: 18,
    accessToken: API_KEY
})

// second tile layer for background
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution: 'Map data',
    maxZoom: 18,
    accessToken: API_KEY
})

// second tile layer for background
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution: 'Map data',
    maxZoom: 18,
    accessToken: API_KEY
})

let map = L.map('mapid',{
    center: [40.7,-94.5],
    zoom: 3,
    layers:[streets]
})

let baseMap = {
    "Streets": streets,
    "Satellite": satelliteStreets,
    "Light": light
}

let allEarthquakes = new L.LayerGroup()
let largeEarthquakes = new L.LayerGroup()
let tectonicplates = new L.LayerGroup()

let overlays = {
    "Tectonic Plates": tectonicplates,
    "Earthquakes": allEarthquakes
}

L.control.layers(baseMap. overlays).addTo(map)

//Retrieve the geoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data){


})
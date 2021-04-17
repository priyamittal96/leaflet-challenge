console.log("working");


// title layer as the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',{
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
}

// L.control.layers(baseMap, overlays)
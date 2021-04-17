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
    // function return style for each earthquake

    function styleInfo(feature){
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        }
    }

    function getColor(magnitude){
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        if (magnitude > 4) {
            return "#ea822c";
        }
        if (magnitude > 3) {
            return "#ee9c00";
        }
        if (magnitude > 2) {
            return "#eecc00";
        }
        if (magnitude > 1) {
            return "#d4ee00";
        }
        return "#98eee00"
    }

    // determining the radius of the earthquake marker
    // eathquake with a mag of 1 being plotted with wrong radius
    function getRadius(magnitude){
        if (magnitude === 0) {
            return 1
        }
        return magnitude * 4;
    }

    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
                console.log(data);
                return L.circleMarker (latlng)
        },
        style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: "  + feature.properties.place);
        }
    }).addTo(allEarthquakes)

    allEarthquakes.addTo(map)

})
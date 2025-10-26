// FROM EJS TO THIS FOLDER 
mapboxgl.accessToken = mapToken; 
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: "mapbox://styles/mapbox/streets-v12",  // standard-satellite
    center: listing.geometry.coordinates, //[139.6917, 35.6895], // starting position [lng, lat] for Tokyo // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9, // starting zoom
    // map.addImage('cat', image);
});

console.log(listing.geometry.coordinates);

// 1. Create the popup first
const popup = new mapboxgl.Popup({offset: 25})
  .setHTML(`<h5>${listing.location}</h5> <p>Exact Location provided after booking</p>`);

// 2. Then, create the marker, set its popup, and add it to the map
const marker = new mapboxgl.Marker( { color: 'red', rotation: 0 } )
  .setLngLat(listing.geometry.coordinates)  // Listings.geometry.coordinates           geometry: { type: 'Point', coordinates: [ 79.0821, 21.1498 ] },
  .setPopup(popup) // Attach the popup here
  .addTo(map); // Add the marker to the map here
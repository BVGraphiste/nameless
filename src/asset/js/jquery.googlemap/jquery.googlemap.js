var zoom = 15;

var lat = 36.252511;
var long = -85.710587;

var path_coords = [{
  lat: lat,
  lng: long
}];
var map;
var map_center;
var path_bounds;

function initialize() {
  map_center = new google.maps.LatLng(lat, long);
  var mapCanvas = document.getElementById('map-canvas');
  var mapOptions = {
    center: map_center,
    zoom: zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(mapCanvas, mapOptions);
  addRoute(map);
}

function addMarker(label, location, map) {
  var marker = new google.maps.Marker({
    position: location,
    label: label,
    map: map
  });
}

function addRoute(map) {
  var lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
  };
  var flightPath = new google.maps.Polyline({
    path: path_coords,
    geodesic: true,
    icons: [{
      icon: lineSymbol,
      offset: '100%'
    }],
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  path_bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < path_coords.length; i++) {
    addMarker((i + 1).toString(), path_coords[i], map);
    path_bounds.extend(
      new google.maps.LatLng(
        path_coords[i].lat,
        path_coords[i].lng));
  }

  flightPath.setMap(map);
  resize();

  google.maps.event.addDomListener(window, 'resize', resize);
}

function resize() {
  map.setCenter(map_center);
}
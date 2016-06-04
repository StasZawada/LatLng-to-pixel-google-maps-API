/* global google */
/* global _ */

// Google Map
var map;

// execute when the DOM is fully loaded
$(function() {
    // styles for map
    // https://developers.google.com/maps/documentation/javascript/styling
    var styles = [

        // hide Google's labels
        {
            featureType: "all",
            elementType: "labels",
            stylers: [
                {visibility: "on"}
            ]
        },

        // hide roads
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                {visibility: "on"}
            ]
        }

    ];

    // options for map
    // https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var options = {
        center: {lat: 64.1023232, lng: -21.8899555}, 
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        maxZoom: 17,
        panControl: true,
        //styles: styles,
        zoom: 11,
        zoomControl: true
    };

    // get DOM node in which map will be instantiated
    var canvas = $("#map-canvas").get(0);

    // instantiate map
    map = new google.maps.Map(canvas, options);



/**
 * here's where magic happens (when clicked)
 */ 

    google.maps.event.addListener(map, "click", function(event) {
      //gets coordinates of map's edges
      var latLngBounds = map.getBounds();
      var neBound = latLngBounds.getNorthEast();
      var swBound = latLngBounds.getSouthWest();

      // convert the bounds in points
      var neBoundInP = map.getProjection().fromLatLngToPoint(neBound);
      var swBoundInP = map.getProjection().fromLatLngToPoint(swBound);
      var click = map.getProjection().fromLatLngToPoint(event.latLng);
      
      // gets pixel value of map size (size of map div) and calculates factor for conversion to google map points (it's probably easier just to take it from map's zoom value [Math.pow(2, map.getZoom())])
      var xRight = document.getElementById("map-container").offsetWidth;
      var factor = xRight / (neBoundInP.x - swBoundInP.x);
 
        // gets mouse position in px (calculated from google maps points)
      var x = Math.round((click.x - swBoundInP.x)*factor);
      var y = Math.round((click.y - neBoundInP.y)*factor);
  
  
      //switches it to LatLng object
      var clickedLatLng = map.getProjection().fromPointToLatLng(new google.maps.Point(pointX, pointY));
     
      //prints position in other div
      $("#position").html('x: ' + x + ' y: ' + y);
    });
});


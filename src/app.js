import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import './css/app.css';

import mapboxgl from 'mapbox-gl';
import 'jquery';
import 'bootstrap';


import style from './json/maputnik_style.js';
import addMapControls from './module/addMapControls.js';
import setupMapControls from './module/setupMapControls.js';
import setupMapControlEvents from './module/setupMapControlEvents.js';


// set up map
var map = new mapboxgl.Map({
    container: 'map',
    style: style,
    minZoom: 3,
    maxZoom: 13.99,
    zoom: 3,
    center: [-104, 39]
});


console.log('calling addMapControls, setupMapControls, setupMapControlEvents from app.js');
addMapControls(map);
setupMapControls(map);
setupMapControlEvents(map);



map.on('load', function () {
    //setTiles
});

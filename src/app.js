import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import './css/app.css';

import mapboxgl from 'mapbox-gl';
import 'jquery';
import 'bootstrap';

import {
    debounce
}
from './module/utilityFunctions.js';

import {
    setTileSources,
    setTileLayers
}
from './module/getTiles.js';


import updateMap from './module/updateMap.js';
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
    console.log('calling setTileSources, setTileLayers from app.js onLoad');
    setTileSources(map);
    setTileLayers(map);

    // startup hack, remove when mapbox gl js implements dataend
    var interval = setInterval(function () {
        var features = map.queryRenderedFeatures({
            layers: ['state-fill']
        }) || [];

        if (features.length > 0) {
            console.log('map loaded');
            console.log('calling updateMap from app.js onLoad');
            updateMap(map);
            clearInterval(interval);
        }
    }, 250);

});




map.on('moveend', debounce(function () {
    console.log('moveend update');
    updateMap(map);
}, 250));

map.on('zoomend', debounce(function () {
    console.log('zoomend update');
    updateMap(map);
}, 250));

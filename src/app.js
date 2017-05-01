/* global mapboxgl */


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
import style from './json/maputnik_style.json';
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


addMapControls(map);
setupMapControls(map);
setupMapControlEvents(map);



map.on('load', function () {

    setTileSources(map);
    setTileLayers(map);

    // startup hack, remove when mapbox gl js implements dataend
    var interval = setInterval(function () {
        var features = map.queryRenderedFeatures({
            layers: ['state-fill']
        }) || [];

        if (features.length > 0) {
            updateMap(map);
            clearInterval(interval);
        }
    }, 250);

});




map.on('moveend', debounce(function () {
    updateMap(map);
}, 250));

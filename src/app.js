import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import './css/app.css';

import mapboxgl from 'mapbox-gl';
import 'jquery';
import 'bootstrap';


import style from './json/maputnik_style.js';
import addMapControls from './module/addMapControls.js';
import setupMapControls from './module/setupMapControlEvents.js';

import populateThemes from './module/populateThemes.js';
import populateDatasets from './module/populateDatasets.js';
import populateGeography from './module/populateGeography.js';

import updateMap from './module/updateMap.js';
import datatree from './json/datatree.js';

import {
    Store,
    observeStore
}
from './module/reduxSetup.js';



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

populateDatasets();
populateGeography();
populateThemes();



map.on('load', function () {

    addNewLayer();

    window.setInterval(function () {
        updateMap(map);
    }, 200);

});



observeStore('theme', function () {
    removeCurrentLayer();
    addNewLayer();
});

observeStore('dataset', function () {
    populateGeography();
});

observeStore('geoscheme', function () {
    removeCurrentLayer();
    addNewLayer();
});




function removeCurrentLayer() {

    map.removeLayer('tilelayer');
    map.removeSource('tilesource');
    Store.dispatch({
        type: 'UPDATE UNIQUES',
        value: {}
    });
}

function addNewLayer() {

    var current_store_values = Store.getState();
    var theme = current_store_values.theme;
    var dataset = current_store_values.dataset;
    var geography_name = current_store_values.geoscheme;

    var theme_table = datatree[dataset][theme].table;

    let tiles = {
        "type": "vector",
        "tiles": [`https://tiles.red-meteor.com/mbtiles/e${theme_table}_${dataset}_${geography_name}/{z}/{x}/{y}.pbf`]
    };

    map.addSource('tilesource', tiles);

    var obj = {
        "id": 'tilelayer',
        "type": "fill",
        "source": 'tilesource',
        "source-layer": geography_name,
        "paint": {
            "fill-color": {
                "property": "AFFGEOID",
                "type": "categorical",
                "default": "transparent",
                "stops": [["0", "blue"]]
            }
        }
    };

    map.addLayer(obj, 'road_major_motorway');

}

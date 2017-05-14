import {
    Store
}
from './reduxSetup.js';

import dataset from '../json/dataset.js';
import geo from '../json/geoscheme.js';



function setTileSources(map) {
    console.log('setTileSources');
    // remove old sources
    // TODO better way

    // for now, brute force removal of all layers in dataset.js
    _removeAllSources(map);

    var sources_obj = dataset[Store.getState().dataset].sources;

    Object.keys(sources_obj).forEach(function (key) {
        console.log('added source: ' + key + ' ' + sources_obj[key]);
        map.addSource(key, sources_obj[key]);
    });

}


function setTileLayers(map) {
    console.log('setTileLayers');
    var current_store_values = Store.getState();
    var current_dataset = current_store_values.dataset;
    var geoscheme = current_store_values.geoscheme;

    // remove old layers
    // TODO better way

    // for now, brute force removal of all layers in dataset.js
    _removeAllLayers(map);


    Object.keys(geo[current_dataset][geoscheme]).forEach(function (key) {

        var obj = {
            "id": key + "-fill",
            "type": "fill",
            "source": key,
            "source-layer": key + "geojson",
            "minzoom": geo[current_dataset][geoscheme][key][0],
            "maxzoom": geo[current_dataset][geoscheme][key][1],
            "paint": {
                "fill-color": {
                    "property": "geonum",
                    "type": "categorical",
                    "default": "transparent",
                    "stops": [["0", "blue"]]
                }
            }
        };

        console.log('map layer added: ' + key + '-fill');
        map.addLayer(obj, 'road_major_motorway');
    });

}

function _removeAllSources(map) {
    console.log('removeAllSources');
    const possible_sources = ['state', 'county', 'place', 'tract', 'bg'];

    possible_sources.forEach(function (source) {
        if (map.isSourceLoaded(source)) {
            console.log('removed source: ' + source);
            map.removeSource(source);
        }
    });

}

function _removeAllLayers(map) {
    console.log('removeAllLayers');
    const possible_layers = ['state-fill', 'county-fill', 'place-fill', 'tract-fill', 'bg-fill'];

    possible_layers.forEach(function (layer) {
        if (!map.getLayer(layer)) {
            console.log('removed layer: ' + layer);
            map.removeLayer(layer);
        }
    });

}

export {
    setTileSources,
    setTileLayers
};

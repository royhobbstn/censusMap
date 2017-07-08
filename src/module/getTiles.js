import {
    Store
}
from './reduxSetup.js';

import dataset from '../json/dataset.js';
import geo from '../json/geo.js';



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

    // remove old layers
    // TODO better way

    // for now, brute force removal of all layers in dataset.js
    _removeAllLayers(map);


    geo[current_dataset].forEach(function (key) {

        var obj = {
            "id": "state-fill",
            "type": "fill",
            "source": "state",
            "source-layer": "stategeojson",
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
        if (map.getSource(source)) {
            console.log('removed source: ' + source);
            map.removeSource(source);
        }
        else {
            console.log('source does not exist: ' + source);
        }
    });

}

function _removeAllLayers(map) {
    console.log('removeAllLayers');
    const possible_layers = ['state-fill', 'county-fill', 'place-fill', 'tract-fill', 'bg-fill'];

    possible_layers.forEach(function (layer) {
        if (map.getLayer(layer)) {
            console.log('removed layer: ' + layer);
            map.removeLayer(layer);
        }
        else {
            console.log('layer does not exist: ' + layer);
        }
    });

}

export {
    setTileSources,
    setTileLayers
};

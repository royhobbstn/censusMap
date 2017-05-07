import {
    Store
}
from './reduxSetup.js';

import dataset from '../json/dataset.js';
import geo from '../json/geoscheme.js';



function setTileSources(map) {

    // remove old sources
    // TODO

    var sources_obj = dataset[Store.getState().dataset].sources;

    console.log(sources_obj);

    Object.keys(sources_obj).forEach(function (key) {
        map.addSource(key, sources_obj[key]);
    });

}


function setTileLayers(map) {

    // remove old layers
    // TODO

    var current_store_values = Store.getState();
    var current_dataset = current_store_values.dataset;
    var geoscheme = current_store_values.geoscheme;

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

        map.addLayer(obj, 'road_major_motorway');
    });

}


export {
    setTileSources,
    setTileLayers
};

import {
    observeStore
}
from './reduxSetup.js';

import updateMap from './updateMap.js';
import populateThemes from './populateThemes.js';
import populateDatasets from './populateDatasets.js';
import populateGeography from './populateGeography.js';
import {
    setTileSources,
    setTileLayers
}
from './getTiles.js';


export default function (map) {
    console.log('setupMapControl');

    observeStore('theme', function (theme) {
        console.log('theme changed to ' + theme);
        console.log('calling updateMap from observeStore THEME');
        // updateMap(map);
    });

    observeStore('dataset', function (dataset) {
        console.log('dataset changed to ' + dataset);
        console.log('calling populateGeography from observeStore DATASET');
        populateGeography();
    });

    observeStore('geoscheme', function (geoscheme) {
        console.log('geoscheme changed to ' + geoscheme);
        console.log('calling setTileSources from observeStore GEOSCHEME');
        setTileSources(map);
        console.log('calling setTileLayers from observeStore GEOSCHEME');
        setTileLayers(map);
        console.log('calling populateThemes from observeStore GEOSCHEME');
        populateThemes();

    });


    // will only be called once
    console.log('initial calls of populateDatasets, populateGeography, and populateThemes');
    populateDatasets();
    populateGeography();
    populateThemes();

}

import {
    observeStore
}
from './reduxSetup.js';

import updateMap from './updateMap.js';
import populateThemes from './populateThemes.js';
import populateDatasets from './populateDatasets.js';
import populateGeography from './populateGeography.js';



export default function (map) {


    observeStore('theme', function (theme) {
        console.log('theme changed to ' + theme);
        updateMap(map);
    });

    observeStore('dataset', function (dataset) {
        console.log('dataset changed to ' + dataset);
        populateGeography();
    });

    observeStore('geoscheme', function (geoscheme) {
        console.log('geoscheme changed to ' + geoscheme);
        populateThemes();
    });


    // will only be called once
    populateDatasets();
    populateGeography();
    populateThemes();
}

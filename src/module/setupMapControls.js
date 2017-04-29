import {
    observeStore
}
from './reduxSetup.js';

import updateMap from './updateMap.js';
import populateThemes from './populateThemes.js';
import populateDatasets from './populateDatasets.js';
import populateGeography from './populateGeography.js';



export default function (map) {

    populateThemes();
    populateDatasets();
    populateGeography();

    observeStore('theme', function (theme) {
        console.log('theme changed to ' + theme);
        updateMap(map);
    });

    observeStore('dataset', function (dataset) {
        console.log('dataset changed to ' + dataset);
        updateMap(map);
    });

    observeStore('geoscheme', function (geoscheme) {
        console.log('geoscheme changed to ' + geoscheme);
        updateMap(map);
    });

}

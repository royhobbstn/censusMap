import {
    observeStore
}
from './reduxSetup.js';

import updateMap from './updateMap.js';
import populateThemes from './populateThemes.js';
import populateDatasets from './populateDatasets.js';




export default function (map) {

    var default_theme = 'pop';
    var default_dataset = 'acs1115';

    populateThemes(default_theme);
    populateDatasets(default_dataset);


    observeStore('theme', function (theme) {
        console.log('theme changed to ' + theme);
        updateMap(map);
    });

    observeStore('dataset', function (dataset) {
        console.log('dataset changed to ' + dataset);
        updateMap(map);
    });

}

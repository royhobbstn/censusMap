import {
    observeStore
}
from './reduxSetup.js';

import populateThemes from './populateThemes.js';
import populateDatasets from './populateDatasets.js';
import populateGeography from './populateGeography.js';


export default function () {
    console.log('setupMapControl');

    observeStore('theme', function () {
        //update Tileset
    });

    observeStore('dataset', function () {
        populateGeography();
        //update Tileset
    });

    observeStore('geoscheme', function () {
        populateThemes();
    });


    // will only be called once
    console.log('initial calls of populateDatasets, populateGeography, and populateThemes');
    populateDatasets();
    populateGeography();
    populateThemes();

}

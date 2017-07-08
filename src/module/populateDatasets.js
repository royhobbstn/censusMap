/* global $ */


import geoscheme from './../json/geo.js';
import populateThemes from './populateThemes.js';
import populateGeography from './populateGeography.js';
import {
    Store
}
from './reduxSetup.js';


function populateDatasets() {
    console.log('populateDatasets');

    var current_store_values = Store.getState();

    var default_dataset = current_store_values.dataset;
    console.log('dataset: ' + default_dataset);

    var acs_html = '';
    var census_html = '';

    ['state', 'county', 'place', 'tract', 'bg'].forEach(function (key) {

        var ifchecked = (key === default_dataset) ? 'checked' : '';

        census_html += '<div class="input-group"><span class="input-group-addon"><input type="radio" name="datasetgroup"  value="' + key + '" ' + ifchecked + '></span><input type="text" value="' + key + '" class="form-control"></div>';


        console.log('finished populating dataset');

    });


    $("#acsgroup").append(acs_html);
    $("#censusgroup").append(census_html);


    $("input:radio[name=datasetgroup]").change(function () {

        var new_dataset = $('input:radio[name=datasetgroup]:checked').val();
        console.log('dataset changed to: ' + new_dataset);

        Store.dispatch({
            type: 'CHANGE DATASET',
            value: new_dataset
        });

    });


}

export default populateDatasets;

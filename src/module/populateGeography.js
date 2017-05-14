/* global $ */

import geo from './../json/geoscheme.js';

import {
    Store
}
from './reduxSetup.js';


function populateGeography() {
    console.log('populateGeography');

    var current_store_values = Store.getState();

    var geoscheme = current_store_values.geoscheme;
    var dataset = current_store_values.dataset;
    console.log('geoscheme: ' + geoscheme);
    console.log('dataset: ' + dataset);

    var html = '<br />';

    var keys = Object.keys(geo[dataset]);

    if (!keys.includes(geoscheme)) {
        console.log('current geoscheme not in list.  defaulting to first new.');

        geoscheme = Object.keys(geo[dataset])[0];
        console.log('new geoscheme: ' + geoscheme);

        Store.dispatch({
            type: 'CHANGE GEOSCHEME',
            value: geoscheme
        });

    }

    keys.forEach(function (key) {
        var ifchecked = (key === geoscheme) ? 'checked' : '';
        html += '<div class="input-group"><span class="input-group-addon"><input type="radio" name="geoschemegroup"  value="' + key + '" ' + ifchecked + '></span><input type="text" value="' + key + '" class="form-control"></div>';
    });

    console.log('geography choices populated');

    $("#geogroup").html(html);


    $("input:radio[name=geoschemegroup]").change(function () {
        console.log('geography value changed');
        var new_geoscheme = $('input:radio[name=geoschemegroup]:checked').val();
        console.log('new geoscheme: ' + new_geoscheme);

        Store.dispatch({
            type: 'CHANGE GEOSCHEME',
            value: new_geoscheme
        });

    });

}

export default populateGeography;

/* global $ */

import geo from './../json/geoscheme.json';

import {
    Store
}
from './reduxSetup.js';


function populateGeography() {

    var current_store_values = Store.getState();

    var geoscheme = current_store_values.geoscheme;
    var dataset = current_store_values.dataset;


    var html = '<br />';

    var keys = Object.keys(geo[dataset]);

    if (!keys.includes(geoscheme)) {
        console.log('does not include geoscheme');

        geoscheme = Object.keys(geo[dataset])[0];
        console.log(geoscheme);

        Store.dispatch({
            type: 'CHANGE GEOSCHEME',
            value: geoscheme
        });

    }

    keys.forEach(function (key) {
        var ifchecked = (key === geoscheme) ? 'checked' : '';
        html += '<div class="input-group"><span class="input-group-addon"><input type="radio" name="geoschemegroup"  value="' + key + '" ' + ifchecked + '></span><input type="text" value="' + key + '" class="form-control"></div>';
    });


    $("#geogroup").html(html);


    $("input:radio[name=geoschemegroup]").change(function () {

        var new_geoscheme = $('input:radio[name=geoschemegroup]:checked').val();
        console.log(new_geoscheme);

        Store.dispatch({
            type: 'CHANGE GEOSCHEME',
            value: new_geoscheme
        });

    });

}

export default populateGeography;

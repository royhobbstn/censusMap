/* global $ */

import geo from './../json/geo.js';

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

    var items = geo[dataset];

    if (!items.includes(geoscheme)) {
        console.log('current geoscheme not in list.  defaulting to first new.');

        geoscheme = Object.keys(geo[dataset])[0];
        console.log('new geoscheme: ' + geoscheme);

        Store.dispatch({
            type: 'CHANGE GEOSCHEME',
            value: geoscheme
        });

    }

    items.forEach(function (item) {
        var ifchecked = (item === geoscheme) ? 'checked' : '';
        html += '<div class="input-group"><span class="input-group-addon"><input type="radio" name="geoschemegroup"  value="' + item + '" ' + ifchecked + '></span><input type="text" value="' + item + '" class="form-control"></div>';
    });

    console.log('geography choices populated');

    $("#geogroup").html(html);


    $("input:radio[name=geoschemegroup]").change(function () {
        console.log('geography value changed');
        var new_geo = $('input:radio[name=geoschemegroup]:checked').val();
        console.log('new geo: ' + new_geo);

        Store.dispatch({
            type: 'CHANGE GEOSCHEME',
            value: new_geo
        });

    });

}

export default populateGeography;

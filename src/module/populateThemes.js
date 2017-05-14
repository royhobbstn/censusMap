/* global $ */

import datatree from './../json/datatree.js';

import {
    Store
}
from './reduxSetup.js';


export default function () {
    console.log('populateThemes');

    $('#accordion').html('');

    var current_store_values = Store.getState();
    var dataset = current_store_values.dataset;
    var theme = current_store_values.theme;

    console.log('dataset: ' + dataset);
    console.log('theme: ' + theme);

    var theme_keys = Object.keys(datatree[dataset]);

    var sections_array = theme_keys.map(function (key) {
        return datatree[dataset][key].section;
    });


    if (!theme_keys.includes(theme)) {
        console.log('current theme not included among new themes.');

        theme = theme_keys[0];
        console.log('new theme assigned from first in list: ' + theme);

        Store.dispatch({
            type: 'CHANGE THEME',
            value: theme
        });

    }

    let unique_sections = Array.from(new Set(sections_array));

    unique_sections.sort();

    unique_sections.forEach(function (section, i) {
        $('#accordion').append('<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading' + i +
            '"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapse' + i +
            '" aria-expanded="false" aria-controls="collapse">' + section + '</a></h4></div><div id="collapse' + i +
            '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '"><div id="id' + section +
            '" class="panel-body"></div></div></div>');
    });
    console.log('sections added');

    theme_keys.forEach(function (key) {
        let vchecked = (theme === key) ? 'checked' : '';
        $('#id' + datatree[dataset][key].section).append('<div class="radio"><label><input type="radio" name="optionsRadios" value="' +
            key + '" ' + vchecked + '> ' + datatree[dataset][key].title + '</label></div>'); //to accordion
    });
    console.log('themes added');

    $('input[name=optionsRadios]:radio').change(function () {
        console.log('theme control clicked.  new theme: ' + this.value);
        Store.dispatch({
            type: 'CHANGE THEME',
            value: this.value
        });
    });

}

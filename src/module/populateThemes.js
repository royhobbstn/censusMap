/* global $ */

import datatree from './../json/datatree.json';

export default function (default_theme) {


    var theme_keys = Object.keys(datatree.acs1115);

    var sections_array = theme_keys.map(function (key) {
        return datatree.acs1115[key].section;
    });

    let unique_sections = Array.from(new Set(sections_array));

    unique_sections.sort();

    unique_sections.forEach(function (section, i) {
        $('#accordion').append('<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading1' + i + '"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion1" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse1">' + section + '</a></h4></div><div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '"><div id="id' + section + '" class="panel-body"></div></div></div>');
    });

    theme_keys.forEach(function (key) {
        let vchecked = (default_theme === key) ? 'checked' : '';
        console.log(default_theme);
        console.log(vchecked);
        $('#id' + datatree.acs1115[key].section).append('<div class="radio"><label><input type="radio" name="optionsRadios" value="' + key + '" ' + vchecked + '> ' + datatree.acs1115[key].title + '</label></div>'); //to accordion

    });


}

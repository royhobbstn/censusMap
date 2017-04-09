/* global $ */

import dataset from './../json/dataset.json';

export default function () {

    var acs_html = '';
    var census_html = '';

    var dataset_keys = Object.keys(dataset);

    dataset_keys.forEach(function (key) {
        if (dataset[key].type === "ACS") {
            console.log(key);
            acs_html += '<div class="input-group"><span class="input-group-addon"><input type="radio" name="datasetgroup"  value="' + key + '"></span><input type="text" value="' + dataset[key].title + '" class="form-control"></div>';
        }
        else if (dataset[key].type === "Census") {
            census_html += '<div class="input-group"><span class="input-group-addon"><input type="radio" name="datasetgroup"  value="' + key + '"></span><input type="text" value="' + dataset[key].title + '" class="form-control"></div>';
        }
        else {
            console.error('Unknown Dataset Type');
        }


    });


    $("#acsgroup").append(acs_html);
    $("#censusgroup").append(census_html);



    // let unique_sections = Array.from(new Set(sections_array));

    // unique_sections.sort();

    // unique_sections.forEach(function (section, i) {
    //     $('#accordion').append('<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading' + i +
    //         '"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapse' + i +
    //         '" aria-expanded="false" aria-controls="collapse">' + section + '</a></h4></div><div id="collapse' + i +
    //         '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '"><div id="id' + section +
    //         '" class="panel-body"></div></div></div>');
    // });

    // theme_keys.forEach(function (key) {
    //     let vchecked = (default_theme === key) ? 'checked' : '';
    //     $('#id' + datatree.acs1115[key].section).append('<div class="radio"><label><input type="radio" name="optionsRadios" value="' +
    //         key + '" ' + vchecked + '> ' + datatree.acs1115[key].title + '</label></div>'); //to accordion
    // });




}

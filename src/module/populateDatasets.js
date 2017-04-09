/* global $ */

import dataset from './../json/dataset.json';


export default function (default_dataset) {

    var acs_html = '';
    var census_html = '';

    var dataset_keys = Object.keys(dataset);

    dataset_keys.forEach(function (key) {

        var ifchecked = (key === default_dataset) ? 'checked' : '';

        if (dataset[key].type === "ACS") {
            acs_html += '<div class="input-group"><span class="input-group-addon"><input type="radio" name="datasetgroup"  value="' + key + '" ' + ifchecked + '></span><input type="text" value="' + dataset[key].title + '" class="form-control"></div>';
        }
        else if (dataset[key].type === "Census") {
            census_html += '<div class="input-group"><span class="input-group-addon"><input type="radio" name="datasetgroup"  value="' + key + '" ' + ifchecked + '></span><input type="text" value="' + dataset[key].title + '" class="form-control"></div>';
        }
        else {
            console.error('Unknown Dataset Type');
        }


    });


    $("#acsgroup").append(acs_html);
    $("#censusgroup").append(census_html);

    $("input:radio[name=datasetgroup]").change(function () {
        console.log($('input:radio[name=datasetgroup]:checked').val());
    });


}

/* global mapboxgl */
/* global fetch */
/* global exprEval */

import stateLookup from './lookups/stateLookup.js';

import DropdownCtrl from './widgets/DropdownCtrl.js';
import LegendCtrl from './widgets/LegendCtrl.js';
import EasyButton from './widgets/EasyButtonCtrl.js';

import computed_breaks from './json/computed_breaks.json';
import style from './json/maputnik_style.json';
import colortree from './json/colortree.json';

import updateLegend from './module/updateLegend.js';


// set up map
var map = new mapboxgl.Map({
    container: 'map',
    style: style,
    zoom: 3,
    center: [-104, 39]
});

map.addControl(new EasyButton('custom_search', 'fa-search', 'Search'), 'top-right');

map.addControl(new mapboxgl.NavigationControl());

map.addControl(new DropdownCtrl(), 'top-left');
map.addControl(new LegendCtrl(), 'bottom-right');

map.addControl(new EasyButton('choose_statistic', 'fa-bars', 'Select a Statistic'), 'top-left');
map.addControl(new EasyButton('choose_geography', 'fa-compass', 'Change the Geography Layer'), 'top-left');
map.addControl(new EasyButton('view_table', 'fa-table', 'View a Data Table'), 'top-left');
map.addControl(new EasyButton('view_chart', 'fa-line-chart', 'View a Chart'), 'top-left');
map.addControl(new EasyButton('save_map', 'fa-floppy-o', 'Save a Map Image'), 'top-left');
map.addControl(new EasyButton('clear_selection', 'fa-eraser', 'Clear Selection'), 'top-left');

// add map event listeners
// map.on('click', createPopup);

document.getElementById('acs_stat').addEventListener('change', updateMap, false);
document.getElementById('choose_statistic').addEventListener('click', clickChooseStatistic, false);




function clickChooseStatistic() {
    console.log('choose_statistic clicked');
}

function updateMap() {

    if (map.popup) {
        map.popup.remove();
    }

    var current_dropdown_value = getSelectValues(document.getElementById('acs_stat'))[0];

    updateLegend(current_dropdown_value);


    fetchCensusData(current_dropdown_value).then((acs_data) => {
        map.on('click', function (e) {
            var map_reference = this;
            createPopup(e, acs_data, current_dropdown_value, map_reference);
        });
        map.setPaintProperty('county-fill', 'fill-opacity', 0.8); // make county-fill layer visible
        map.setPaintProperty('county-fill', 'fill-color', getMapStyle(current_dropdown_value, acs_data));
    });
}

function fetchCensusData(style_code) {
    // load census data
    return fetch('https://gis.dola.colorado.gov/capi/demog?limit=99999&db=acs1115&table=' + computed_breaks[style_code].table + '&sumlev=50').then(function (fetch_response) {
        return fetch_response.json();
    }).then(function (census_response) {
        return census_response.data;
    });
}

function getMapStyle(style_code, acs_data) {

    let expression = computed_breaks[style_code].expression;
    let default_color = "#fff"; // lowest break color
    let null_color = "#fff";
    let zero_color = "#fff";
    let array = computed_breaks[style_code].array_7;
    let colorscheme = computed_breaks[style_code].default_7;

    // set up parser (https://github.com/silentmatt/expr-eval)
    var parser = new exprEval.Parser();
    var exp = parser.parse(expression.join(""));

    // iterate through acs data
    let stops = acs_data.map(function (row) {

        let evaluated_value;

        // don't attempt to use expression parser if array is only 1 element
        // which means single variable
        if (expression.length > 1) {

            let replacers_object = {};

            getUniqueExpressionKeys(expression).forEach(function (key) {
                replacers_object[key] = row[key];
            });

            evaluated_value = exp.evaluate(replacers_object);
        }
        else {
            evaluated_value = row[expression[0]];
        }


        // default case
        let color = default_color;

        // iterate through array breaks
        array.forEach(function (entry, i) {
            if (evaluated_value > entry) {
                color = colortree[colorscheme][i];
            }
        });

        // null case
        if (!evaluated_value) {
            color = null_color;
        }

        // zero case: always after the null case
        if (evaluated_value === 0) {
            color = zero_color;
        }

        return [row.geonum, color];

    });

    return {
        "property": "geonum",
        "type": "categorical",
        "stops": stops
    };

}

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}

init();

function init() {
    updateMap();
}



function createPopup(e, acs_data, style_code, map_reference) {

    // 'this' here represents the map. ??!

    // a popup property is conveniently tacked on to the map
    if (map_reference.popup) {
        map_reference.popup.remove();
    }

    var features = map_reference.queryRenderedFeatures(e.point, {
        layers: ['county-fill']
    });

    if (!features.length) {
        return;
    }

    var feature = features[0];

    var geoname = feature.properties.geoname;
    var state = stateLookup(feature.properties.state);

    var label = computed_breaks[style_code].popup_label;
    var popup_stat = getPopupStat(feature.properties.geonum, computed_breaks[style_code].expression, acs_data);


    map_reference.popup = new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(geoname + " County, " + state + "<br />" + label + " " + popup_stat)
        .addTo(map_reference);
}


function getPopupStat(geonum, expression, acs_data) {

    var stat = null;

    // set up parser (https://github.com/silentmatt/expr-eval)
    var parser = new exprEval.Parser();
    var exp = parser.parse(expression.join(""));

    let replacers_object = {};

    for (var i = 0; i < acs_data.length; i++) {
        if (acs_data[i].geonum === geonum.toString()) {

            getUniqueExpressionKeys(expression).forEach(function (key) {
                replacers_object[key] = acs_data[i][key];
            })

            stat = exp.evaluate(replacers_object);
            break;
        }
    }

    return parseInt(stat, 10).toLocaleString() || 'Unknown';
}



function getUniqueExpressionKeys(expression) {

    // extract data fields from expression (example: ["b01001001", "b01001002"])
    let keys = expression.filter(function (d) {
        if (d !== "+" && d !== "-" & d !== "(" & d !== ")" & d !== "*" & d !== "/") {
            return true;
        }
    });

    let unique_keys = Array.from(new Set(keys));

    return unique_keys;
}

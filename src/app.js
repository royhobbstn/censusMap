/* global mapboxgl */
/* global fetch */
/* global exprEval */
/* global $ */

import {
    Store,
    observeStore
}
from './module/reduxSetup.js';



import LegendCtrl from './widgets/LegendCtrl.js';
import EasyButton from './widgets/EasyButtonCtrl.js';

import style from './json/maputnik_style.json';
import computed_breaks from './json/computed_breaks.json';
import datatree from './json/datatree.json';
import colortree from './json/colortree.json';

import updateLegend from './module/updateLegend.js';
import populateThemes from './module/populateThemes.js';
import populateDatasets from './module/populateDatasets.js';

// set up map
var map = new mapboxgl.Map({
    container: 'map',
    style: style,
    minZoom: 3,
    maxZoom: 13.99,
    zoom: 3,
    center: [-104, 39]
});

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};

map.addControl(new EasyButton('custom_search', 'fa-search', 'Search'), 'top-right');
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new LegendCtrl(), 'bottom-right');
map.addControl(new EasyButton('choose_theme', 'fa-bars', 'Select a Theme'), 'top-left');
map.addControl(new EasyButton('view_table', 'fa-table', 'View a Data Table'), 'top-left');
map.addControl(new EasyButton('view_chart', 'fa-line-chart', 'View a Chart'), 'top-left');
map.addControl(new EasyButton('save_map', 'fa-floppy-o', 'Save a Map Image'), 'top-left');
map.addControl(new EasyButton('clear_selection', 'fa-eraser', 'Clear Selection'), 'top-left');

var default_theme = 'pop';
var default_dataset = 'acs1115';

populateThemes(default_theme);
populateDatasets(default_dataset);


observeStore('theme', function (theme) {
    console.log('theme changed to ' + theme);
    updateMap(theme);
});

observeStore('dataset', function (dataset) {
    console.log('dataset changed to ' + dataset);
});



$('#myModal').modal({
    show: false
});

document.getElementById('choose_theme').addEventListener('click', clickChooseTheme, false);

function clickChooseTheme() {
    $('#myModal').modal('show');
}

$('input[name=optionsRadios]:radio').change(function () {
    Store.dispatch({
        type: 'CHANGE THEME',
        value: this.value
    });
});



map.on('load', function () {


    map.addSource('state', {
        "type": "vector",
        "tiles": [
        "https://red-meteor.com/mbtiles/state_carto_2015/{z}/{x}/{y}.pbf"
      ],
        "minzoom": 3,
        "maxzoom": 5
    });

    map.addSource('county', {
        "type": "vector",
        "tiles": [
        "https://red-meteor.com/mbtiles/county_carto_2015/{z}/{x}/{y}.pbf"
      ],
        "minzoom": 5,
        "maxzoom": 9
    });

    map.addSource('tract', {
        "type": "vector",
        "tiles": [
        "https://red-meteor.com/mbtiles/tract_carto_2015/{z}/{x}/{y}.pbf"
      ],
        "minzoom": 9,
        "maxzoom": 12
    });

    map.addSource('bg', {
        "type": "vector",
        "tiles": [
        "https://red-meteor.com/mbtiles/bg_carto_2015/{z}/{x}/{y}.pbf"
      ],
        "minzoom": 12,
        "maxzoom": 14
    });

    map.addLayer({
        "id": "state-fill",
        "type": "fill",
        "source": "state",
        "source-layer": "stategeojson",
        "minzoom": 3,
        "maxzoom": 5,
        "layout": {
            "visibility": "visible"
        }
    }, 'road_major_motorway');

    map.addLayer({
        "id": "county-fill",
        "type": "fill",
        "source": "county",
        "source-layer": "county",
        "minzoom": 5,
        "maxzoom": 9,
        "layout": {
            "visibility": "visible"
        }
    }, 'road_major_motorway');

    map.addLayer({
        "id": "tract-fill",
        "type": "fill",
        "source": "tract",
        "source-layer": "tractgeojson",
        "minzoom": 9,
        "maxzoom": 12,
        "layout": {
            "visibility": "visible"
        }
    }, 'road_major_motorway');

    map.addLayer({
        "id": "bg-fill",
        "type": "fill",
        "source": "bg",
        "source-layer": "bggeojson",
        "minzoom": 12,
        "maxzoom": 14,
        "layout": {
            "visibility": "visible"
        }
    }, 'road_major_motorway');








    map.addLayer({
        "id": "county-lines",
        "type": "line",
        "source": "county",
        "source-layer": "county",
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "line-color": "rgb(100, 100, 100)",
            "line-opacity": 0.6,
            "line-width": 0.3
        }
    }, 'county-fill');

    updateMap(default_theme);

});

var myEfficientFn = debounce(function () {

    var features = map.queryRenderedFeatures({
        layers: ['county-fill']
    });

    var all_geonums = features.map(function (feature) {
        return feature.properties.geonum;
    });
    console.log('-------');
    console.log(map.getZoom());

    console.log('moveend');
    console.log(all_geonums);
}, 250);

map.on('moveend', myEfficientFn);





function updateMap(theme) {
    updateLegend(theme);

    fetchCensusData(theme).then((acs_data) => {
        map.setPaintProperty('county-fill', 'fill-opacity', 0.8); // make county-fill layer visible
        map.setPaintProperty('county-fill', 'fill-color', getMapStyle(theme, acs_data));
    });
}

function fetchCensusData(style_code) {
    // load census data
    return fetch('https://gis.dola.colorado.gov/capi/demog?limit=99999&db=acs1115&table=' + datatree.acs1115[style_code].table + '&sumlev=50').then(function (fetch_response) {
        return fetch_response.json();
    }).then(function (census_response) {
        return census_response.data;
    });
}




function getMapStyle(style_code, acs_data) {

    let expression = datatree.acs1115[style_code].expression;
    let default_color = "#fff"; // lowest break color
    let null_color = "#fff";
    let zero_color = "#fff";


    let breaks_style = datatree.acs1115[style_code].favstyle[0] + datatree.acs1115[style_code].favstyle[1];
    let color_style = datatree.acs1115[style_code].favstyle[2] + '_' + datatree.acs1115[style_code].favstyle[1];

    let array = computed_breaks.acs1115[style_code].county[breaks_style];
    let colorscheme = colortree[color_style];

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
                color = colorscheme[i];
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

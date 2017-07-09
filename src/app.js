import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import './css/app.css';

import mapboxgl from 'mapbox-gl';
import 'jquery';
import 'bootstrap';


import style from './json/maputnik_style.js';
import addMapControls from './module/addMapControls.js';
import setupMapControls from './module/setupMapControls.js';
import setupMapControlEvents from './module/setupMapControlEvents.js';

var Parser = require('expr-eval').Parser;
import computed_breaks from './json/computed_breaks.js';
import datatree from './json/datatree.js';
import colortree from './json/colortree.js';

import {
    Store
}
from './module/reduxSetup.js';

let uniques = {};

// set up map
var map = new mapboxgl.Map({
    container: 'map',
    style: style,
    minZoom: 3,
    maxZoom: 13.99,
    zoom: 3,
    center: [-104, 39]
});


console.log('calling addMapControls, setupMapControls, setupMapControlEvents from app.js');
addMapControls(map);
setupMapControls(map);
setupMapControlEvents(map);



map.on('load', function () {

    let tiles = {
        "type": "vector",
        "tiles": ["https://tiles.red-meteor.com/mbtiles/eB01001_acs1115_state/{z}/{x}/{y}.pbf"]
    };

    map.addSource('state', tiles);

    var obj = {
        "id": "state-fill",
        "type": "fill",
        "source": "state",
        "source-layer": "state",
        "paint": {
            "fill-color": {
                "property": "AFFGEOID",
                "type": "categorical",
                "default": "transparent",
                "stops": [["0", "blue"]]
            }
        }
    };

    map.addLayer(obj, 'road_major_motorway');

    window.setInterval(function () {
        updateMap();
    }, 200);

});


function updateMap() {

    var current_store_values = Store.getState();
    var theme = current_store_values.theme;

    var dataset = current_store_values.dataset;

    var geography_name = current_store_values.geoscheme;

    var features = map.queryRenderedFeatures({
        layers: [geography_name + '-fill']
    });

    const orig_number_uniques = Object.keys(uniques).length;

    features.forEach(function (d) {
        if (!uniques[d.properties.AFFGEOID]) {
            uniques[d.properties.AFFGEOID] = d;
        }
    });

    const new_number_uniques = Object.keys(uniques).length;


    if (orig_number_uniques === new_number_uniques) {
        return; // short circuit if no new features have been added to the map
    }

    // only paint/update style if new Uniques!
    console.log((new_number_uniques - orig_number_uniques) + ' new features.  Updating.');

    map.setPaintProperty(geography_name + '-fill', 'fill-opacity', 0.8);
    map.setPaintProperty(geography_name + '-fill', 'fill-color', getMapStyle(theme, geography_name, dataset));

}




function getMapStyle(style_code, geography_name, dataset) {

    let expression = datatree[dataset][style_code].expression;

    let default_color = "#fff"; // lowest break color
    let null_color = "#fff";
    let zero_color = "#fff";


    let breaks_style = datatree[dataset][style_code].favstyle[0] + datatree[dataset][style_code].favstyle[1];
    let color_style = datatree[dataset][style_code].favstyle[2] + '_' + datatree[dataset][style_code].favstyle[1];

    let array = computed_breaks[dataset][style_code][geography_name][breaks_style];
    let colorscheme = colortree[color_style];


    // set up parser (https://github.com/silentmatt/expr-eval)
    var parser = new Parser();

    var exp = parser.parse(expression.join(""));

    // iterate through acs data
    let stops = Object.keys(uniques).map(function (row) {

        let evaluated_value;

        // don't attempt to use expression parser if array is only 1 element
        // which means single variable
        if (expression.length > 1) {

            let replacers_object = {};

            getUniqueExpressionKeys(expression).forEach(function (key) {
                replacers_object[key] = uniques[row].properties[key];
            });

            evaluated_value = exp.evaluate(replacers_object);
        }
        else {
            evaluated_value = uniques[row].properties[expression[0]];
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

        return [uniques[row].properties.AFFGEOID, color];

    });

    return {
        "property": "AFFGEOID",
        "type": "categorical",
        "default": "transparent",
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

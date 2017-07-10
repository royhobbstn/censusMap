import {
    Store
}
from './reduxSetup.js';

var Parser = require('expr-eval').Parser;
import computed_breaks from '../json/computed_breaks.js';
import datatree from '../json/datatree.js';
import colortree from '../json/colortree.js';


export default function (map) {

    var current_store_values = Store.getState();
    var theme = current_store_values.theme;

    var dataset = current_store_values.dataset;

    var geography_name = current_store_values.geoscheme;

    var features = map.queryRenderedFeatures({
        layers: ['tilelayer']
    });


    let uniques = Object.assign({}, current_store_values.uniques);

    const orig_number_uniques = Object.keys(uniques).length;

    features.forEach(function (d) {
        if (!uniques[d.properties.AFFGEOID]) {
            uniques[d.properties.AFFGEOID] = d.properties;
        }
    });

    const new_number_uniques = Object.keys(uniques).length;

    if (orig_number_uniques === new_number_uniques) {
        return; // short circuit if no new features have been added to the map
    }

    // only paint/update style if new Uniques!
    console.log((new_number_uniques - orig_number_uniques) + ' new features.  Updating.');

    Store.dispatch({
        type: 'UPDATE UNIQUES',
        value: uniques
    });


    // TODO add extra styles at once... don't do extra round of setPaintProperty
    // map.setPaintProperty('tilelayer', 'fill-opacity', 0.8);
    map.setPaintProperty('tilelayer', 'fill-color', getMapStyle(theme, geography_name, dataset, uniques));

}


function getMapStyle(style_code, geography_name, dataset, uniques) {

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
                replacers_object[key] = uniques[row][key];
            });

            evaluated_value = exp.evaluate(replacers_object);
        }
        else {
            evaluated_value = uniques[row][expression[0]];
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

        return [uniques[row].AFFGEOID, color];

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

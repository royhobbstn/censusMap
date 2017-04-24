/* global fetch */
/* global exprEval */

import {
    Store
}
from './reduxSetup.js';


import updateLegend from './updateLegend.js';
import computed_breaks from '../json/computed_breaks.json';
import datatree from '../json/datatree.json';
import colortree from '../json/colortree.json';
import geo from '../json/geoscheme.json';




function getGeographyName(geoscheme, zoom) {

    var geography_name = "";

    Object.keys(geoscheme).forEach(function (key) {
        if (zoom >= geoscheme[key][0] && zoom < geoscheme[key][1]) {
            geography_name = key;
        }
    });

    return geography_name;

}


export default function (map) {

    var current_store_values = Store.getState();
    var theme = current_store_values.theme;
    var geoscheme = current_store_values.geoscheme;
    var dataset = current_store_values.dataset;
    var zoom = map.getZoom();
    var zoom_breaks = geo[dataset][geoscheme];

    var geography_name = getGeographyName(zoom_breaks, zoom);

    var features = map.queryRenderedFeatures({
        layers: [geography_name + '-fill']
    });

    var all_geonums = features.map(function (feature) {
        return feature.properties.geonum;
    });

    var comma_delimited_geonums = all_geonums.join(",");
    console.log(comma_delimited_geonums);

    updateLegend(theme, geography_name);

    fetchCensusData(theme, comma_delimited_geonums).then((acs_data) => {
        map.setPaintProperty(geography_name + '-fill', 'fill-opacity', 0.8); // make layer visible
        map.setPaintProperty(geography_name + '-fill', 'fill-color', getMapStyle(theme, acs_data, geography_name));
    });
}

function fetchCensusData(theme, comma_delimited_geonums) {
    // load census data
    return fetch('https://gis.dola.colorado.gov/capi/demog?limit=99999&db=acs1115&table=' + datatree.acs1115[theme].table + '&geonum=' + comma_delimited_geonums).then(function (fetch_response) {
        return fetch_response.json();
    }).then(function (census_response) {
        return census_response.data;
    });
}




function getMapStyle(style_code, acs_data, geography_name) {

    let expression = datatree.acs1115[style_code].expression;
    let default_color = "#fff"; // lowest break color
    let null_color = "#fff";
    let zero_color = "#fff";


    let breaks_style = datatree.acs1115[style_code].favstyle[0] + datatree.acs1115[style_code].favstyle[1];
    let color_style = datatree.acs1115[style_code].favstyle[2] + '_' + datatree.acs1115[style_code].favstyle[1];

    let array = computed_breaks.acs1115[style_code][geography_name][breaks_style];
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

/* global fetch */

import localforage from 'localforage';
var Parser = require('expr-eval').Parser;



import {
    Store
}
from './reduxSetup.js';


import updateLegend from './updateLegend.js';
import computed_breaks from '../json/computed_breaks.js';
import datatree from '../json/datatree.js';
import colortree from '../json/colortree.js';
import geo from '../json/geoscheme.js';




function getGeographyName(geoscheme, zoom) {
    console.log('getGeographyName');

    var geography_name = "";

    Object.keys(geoscheme).forEach(function (key) {
        if (zoom >= geoscheme[key][0] && zoom < geoscheme[key][1]) {
            geography_name = key;
        }
    });

    console.log('geography name is: ' + geography_name);
    return geography_name;

}


export default function (map) {
    console.log('updateMap');

    var current_store_values = Store.getState();
    var theme = current_store_values.theme;
    console.log('theme: ' + theme);

    var geoscheme = current_store_values.geoscheme;
    console.log('geoscheme: ' + geoscheme);

    var dataset = current_store_values.dataset;
    console.log('dataset: ' + dataset);

    var zoom = map.getZoom();
    console.log('map zoom: ' + zoom);

    var zoom_breaks = geo[dataset][geoscheme];
    console.log('zoom breaks: ' + zoom_breaks);

    var geography_name = getGeographyName(zoom_breaks, zoom);
    var features = map.queryRenderedFeatures({
        layers: [geography_name + '-fill']
    });

    var all_geonums = Array.from(new Set(features.map(function (feature) {
        return feature.properties.geonum;
    })));

    console.log('number of unique features queried: ' + all_geonums.length);


    var comma_delimited_geonums = all_geonums.join(",");

    updateLegend(theme, geography_name);

    var previously_gathered_data = getPreviousData(datatree[dataset][theme].table, comma_delimited_geonums, dataset);

    previously_gathered_data.then(function (data) {

        var succesful_records = getSuccessfulRecords(data);
        console.log('succesful_records: ' + succesful_records.length);

        var succesful_geonums = getSuccessfulGeonums(succesful_records);
        console.log('succesful_geonums: ' + succesful_geonums.length);

        var unfound_geonums = getUnfoundGeonums(succesful_geonums, comma_delimited_geonums.split(",") || []);
        console.log('unfound_geonums: ' + unfound_geonums.length + ' :detail:');
        console.log(unfound_geonums);

        var unfound_geonums_filtered = unfound_geonums.filter(function (geonum) {
            return (geonum !== '178' && geonum !== ''); // not blank or puerto rico
        });

        if (unfound_geonums_filtered.length > 0) {
            console.log('not all data in localstorage. fetching from api');
            fetchCensusData(theme, unfound_geonums.join(","), dataset).then((acs_data) => {
                console.log('returned from api call with ' + acs_data.length + ' records.');
                var combined_data = succesful_records.concat(acs_data);
                paintMap(theme, combined_data, geography_name, dataset);
            });
        }
        else {
            console.log('all data needed was found in local storage.');
            paintMap(theme, succesful_records, geography_name, dataset);
        }

        function paintMap(theme, map_data, geography_name, dataset) {
            console.log('painting map');
            map.setPaintProperty(geography_name + '-fill', 'fill-opacity', 0.8); // make layer visible
            map.setPaintProperty(geography_name + '-fill', 'fill-color', getMapStyle(theme, map_data, geography_name, dataset));
        }

    });


}


function getUnfoundGeonums(succesful_geonums, all_geonums) {
    console.log('getUnfoundGeonums');
    return all_geonums.filter(function (geonum) {
        return !succesful_geonums.includes(geonum);
    });
}



function getSuccessfulRecords(data) {
    console.log('getSuccessfulRecords');
    if (!data) {
        return [];
    }

    return data.filter(function (record) {
        if (record) {
            return record;
        }
    });
}


function getSuccessfulGeonums(data) {
    console.log('getSuccessfulGeonums');
    return data.map(function (record) {
        return record.geonum;
    });
}


function fetchCensusData(theme, comma_delimited_geonums, dataset) {
    console.log('fetchCensusData');
    // load census data
    return fetch('https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + dataset + '&schema=' + datatree[dataset][theme].schema + '&table=' + datatree[dataset][theme].table + '&geonum=' + comma_delimited_geonums).then(function (fetch_response) {
        return fetch_response.json();
    }).then(function (census_response) {

        // save each returned value to IndexedDB
        census_response.data.forEach(function (record) {
            var key = dataset + ":" + datatree[dataset][theme].table + ":" + record.geonum;
            localforage.setItem(key, record)
                .catch(function (err) {
                    console.log(err);
                });
        });

        return census_response.data;
    });
}

function getPreviousData(table, comma_delimited_geonums, dataset) {
    console.log('getPreviousData');

    if (!comma_delimited_geonums) {
        return Promise.all([]);
    }

    // create Promise Array
    var previous_data = comma_delimited_geonums.split(",").map(function (geonum) {
        var key = dataset + ":" + table + ":" + geonum;
        return localforage.getItem(key);
    });

    return Promise.all(previous_data);

}


function getMapStyle(style_code, acs_data, geography_name, dataset) {
    console.log('getMapStyle');

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

/* global mapboxgl */
/* global fetch */

import stateLookup from './module/stateLookup.js';
import DropdownCtrl from './module/DropdownCtrl.js';
import computed_breaks from './module/computed_breaks.json';
import style from './module/maputnik_style.json';



// set up map

var map = new mapboxgl.Map({
    container: 'map',
    style: style,
    zoom: 3,
    center: [-104, 39]
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new DropdownCtrl(), 'top-left');


// add map event listeners
// map.on('click', createPopup);

document.getElementById('acs_stat').addEventListener('change', updateMap, false);



function updateMap() {
    if (map.popup) {
        map.popup.remove();
    }
    var current_dropdown_value = getSelectValues(document.getElementById('acs_stat'))[0];
    
    fetchCensusData(current_dropdown_value).then((acs_data) => {
        map.on('click', function(e) {
            var map_reference = this;
            createPopup(e, acs_data, current_dropdown_value, map_reference);
        });
        map.setPaintProperty('county-fill', 'fill-opacity', 0.8); // make county-fill layer visible
        map.setPaintProperty('county-fill', 'fill-color', getMapStyle(current_dropdown_value, acs_data));
    });
}

function fetchCensusData(style_code) {
    // load census data
    return fetch('https://gis.dola.colorado.gov/capi/demog?limit=99999&db=acs1115&table=' + computed_breaks[style_code].table + '&sumlev=50').then(function(fetch_response) {
        return fetch_response.json();
    }).then(function(census_response) {
        return census_response.data;
    });
}

function getMapStyle(style_code, acs_data) {

    let expression = computed_breaks[style_code].expression;
    let default_color = computed_breaks[style_code].default_color;
    let null_color = computed_breaks[style_code].null_color;
    let zero_color = computed_breaks[style_code].zero_color;
    let array = computed_breaks[style_code].array;

    let stops = acs_data.map(function(row) {
        // default case
        let color = default_color;

        // iterate through array breaks
        array.forEach(function(entry) {
            if (row[expression] > entry.break) {
                color = entry.color;
            }
        });

        // null case
        if (!row[expression]) {
            color = null_color;
        }

        // zero case: always after the null case
        if (row[expression] === 0) {
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


    map_reference.popup = new mapboxgl.Popup({
            closeButton: false
        })
        .setLngLat(e.lngLat)
        .setHTML(geoname + " County, " + state + "<br />" + label + " " + popup_stat)
        .addTo(map_reference);
}


function getPopupStat(geonum, expression, acs_data) {

    var stat = null;

    for (var i = 0; i < acs_data.length; i++) {
        if(acs_data[i].geonum === geonum.toString()) {
            stat = acs_data[i][expression];
            break;
        }
    }

    return parseInt(stat, 10).toLocaleString() || 'Unknown';
}

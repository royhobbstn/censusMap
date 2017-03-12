/* global mapboxgl */
/* global fetch */

import stateLookup from './module/stateLookup.js';

// load maputnik style and census data

Promise.all([
    fetch('maputnik_style.json'),
    fetch('https://gis.dola.colorado.gov/capi/demog?limit=99999&db=acs1115&table=b25077,b19013&sumlev=50')
    ]).then(function (response) {
    return Promise.all(response.map(d => d.json())).then(data => {
        createMap(data);
    });
}).catch(function (err) {
    console.log(err);
});


function createMap(data) {

    let style = data[0];
    let census_data = data[1];

    var stops = [];  // mhi
    var value_stops = []; // mhv

    census_data.data.forEach(function (row) {

        let color = "#edf8fb";
        let value_color = "#edf8fb";

        if (row.b19013001 > 26527) {
            color = "#ccece6";
        }
        if (row.b19013001 > 37201) {
            color = "#99d8c9";
        }
        if (row.b19013001 > 44517) {
            color = "#66c2a4";
        }
        if (row.b19013001 > 52137) {
            color = "#41ae76";
        }
        if (row.b19013001 > 62302) {
            color = "#238b45";
        }
        if (row.b19013001 > 77930) {
            color = "#005824";
        }


        if (row.b25077001 > 50000) {
            value_color = "#eff3ff";
        }
        if (row.b25077001 > 100000) {
            value_color = "#c6dbef";
        }
        if (row.b25077001 > 150000) {
            value_color = "#9ecae1";
        }
        if (row.b25077001 > 200000) {
            value_color = "#6baed6";
        }
        if (row.b25077001 > 300000) {
            value_color = "#3182bd";
        }
        if (row.b25077001 > 500000) {
            value_color = "#08519c";
        }
        
        stops.push([row.geonum, color]);
        value_stops.push([row.geonum, value_color]);

    });


    let median_household_income_style = {
        "property": "geonum",
        "type": "categorical",
        "stops": stops
    };

    let median_home_value_style = {
        "property": "geonum",
        "type": "categorical",
        "stops": value_stops
    };

    let choropleth_layer_index = getLayerIndex();

    style.layers[choropleth_layer_index].paint['fill-color'] = median_household_income_style;
    

    var map = new mapboxgl.Map({
        container: 'map',
        style: style,
        zoom: 3,
        center: [-104, 39]
    });
    
    
    // Control implemented as ES6 class
class HelloWorldControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl';
        this._select = document.createElement('select');
        this._select.id = 'acs_stat';

        this._option1 = document.createElement('option');
        this._option1.text = 'Median Household Income';
        this._option1.value = 'mhi';
        this._option2 = document.createElement('option');
        this._option2.text = 'Median Home Value';
        this._option2.value = 'mhv';
        this._select.appendChild(this._option1);
        this._select.appendChild(this._option2);
        this._container.appendChild(this._select);
        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}


map.addControl(new HelloWorldControl(), 'top-left');



document.getElementById('acs_stat').addEventListener('change', function () {
    var current_dropdown_value = getSelectValues(document.getElementById('acs_stat'));
    if(current_dropdown_value[0] === 'mhi') {
        map.setPaintProperty('county-fill', 'fill-color', median_household_income_style);
    } else if (current_dropdown_value[0] === 'mhv') {
        map.setPaintProperty('county-fill', 'fill-color', median_home_value_style);
    }
}, false);


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


    map.addControl(new mapboxgl.NavigationControl());

    var popup = null;

    map.on('click', function (e) {

        if (popup) {
            popup.remove();
        }

        var features = map.queryRenderedFeatures(e.point, {
            layers: ['county-fill']
        });

        if (!features.length) {
            return;
        }

        var feature = features[0];

        popup = new mapboxgl.Popup({
                closeButton: false
            })
            .setLngLat(e.lngLat)
            .setHTML(feature.properties.geoname + " County, " + stateLookup(feature.properties.state) + "<br />MHI: $ " + getIncome(feature.properties.geonum))
            .addTo(map);
    });


    //

    function getLayerIndex() {
        var return_index = null;
        style.layers.forEach(function (d, i) {
            if (d.id === 'county-fill') {
                return_index = i;
            }
        });
        return return_index;
    }

    function getIncome(geonum) {
        var income = null;
        census_data.data.forEach(function (row) {
            if (row.geonum === geonum) {
                income = row.b19013001;
            }
        });
        return parseInt(income, 10).toLocaleString() || 'Unknown';
    }



}


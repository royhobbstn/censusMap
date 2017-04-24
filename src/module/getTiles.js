function getTileSources(map) {
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

}


function getTileLayers(map) {
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

}


export {
    getTileSources,
    getTileLayers
};

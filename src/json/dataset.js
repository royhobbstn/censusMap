export default {

    "acs1115": {
        "title": "ACS 11-15",
        "type": "ACS",
        "sources": {
            "state": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/eB19013_acs1115_state.mbtiles/{z}/{x}/{y}.pbf"]
            },
            "county": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/eB19013_acs1115_county.mbtiles/{z}/{x}/{y}.pbf"]
            },
            "tract": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/eB19013_acs1115_tract.mbtiles/{z}/{x}/{y}.pbf"]
            },
            "bg": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/eB19013_acs1115_bg.mbtiles/{z}/{x}/{y}.pbf"]
            },
            "place": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/eB19013_acs1115_place.mbtiles/{z}/{x}/{y}.pbf"]
            }
        }
    },
    "c2010": {
        "title": "Census 2010",
        "type": "Census",
        "sources": {
            "state": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/state_carto_c2010/{z}/{x}/{y}.pbf"]
            },
            "county": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/county_carto_c2010/{z}/{x}/{y}.pbf"]
            },
            "tract": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/tract_carto_c2010/{z}/{x}/{y}.pbf"]
            },
            "bg": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/bg_carto_c2010/{z}/{x}/{y}.pbf"]
            },
            "place": {
                "type": "vector",
                "tiles": ["https://s3-us-west-2.amazonaws.com/serve-vector-tiles/place_carto_c2010/{z}/{x}/{y}.pbf"]
            }
        }
    },
    "c2000": {
        "title": "Census 2000",
        "type": "Census",
        "sources": {
            "state": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/state_carto_c2000/{z}/{x}/{y}.pbf"]
            },
            "county": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/county_carto_c2000/{z}/{x}/{y}.pbf"]
            },
            "tract": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/tract_carto_c2000/{z}/{x}/{y}.pbf"]
            },
            "bg": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/bg_carto_c2000/{z}/{x}/{y}.pbf"]
            },
            "place": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/place_carto_c2000/{z}/{x}/{y}.pbf"]
            }
        }
    },
    "c1990": {
        "title": "Census 1990",
        "type": "Census",
        "sources": {
            "state": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/state_nhgis_c1990/{z}/{x}/{y}.pbf"]
            },
            "county": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/county_nhgis_c1990/{z}/{x}/{y}.pbf"]
            },
            "tract": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/tract_nhgis_c1990/{z}/{x}/{y}.pbf"]
            },
            "bg": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/bg_nhgis_c1990/{z}/{x}/{y}.pbf"]
            },
            "place": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/place_nhgis_c1990/{z}/{x}/{y}.pbf"]
            }
        }
    },
    "c1980": {
        "title": "Census 1980",
        "type": "Census",
        "sources": {
            "state": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/state_nhgis_c1980/{z}/{x}/{y}.pbf"]
            },
            "county": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/county_nhgis_c1980/{z}/{x}/{y}.pbf"]
            },
            "tract": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/tract_nhgis_c1980/{z}/{x}/{y}.pbf"]
            },
            "place": {
                "type": "vector",
                "tiles": ["https://tiles.red-meteor.com/mbtiles/place_nhgis_c1980/{z}/{x}/{y}.pbf"]
            }
        }
    }
}

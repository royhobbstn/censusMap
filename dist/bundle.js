(function () {
'use strict';

function stateLookup(statefips_int) {

    let state_hash = [];

    state_hash[1] = "Alabama";
    state_hash[2] = "Alaska";
    state_hash[4] = "Arizona";
    state_hash[5] = "Arkansas";
    state_hash[6] = "California";
    state_hash[8] = "Colorado";
    state_hash[9] = "Connecticut";
    state_hash[10] = "Delaware";
    state_hash[11] = "District of Columbia";
    state_hash[12] = "Florida";
    state_hash[13] = "Georgia";
    state_hash[15] = "Hawaii";
    state_hash[16] = "Idaho";
    state_hash[17] = "Illinois";
    state_hash[18] = "Indiana";
    state_hash[19] = "Iowa";
    state_hash[20] = "Kansas";
    state_hash[21] = "Kentucky";
    state_hash[22] = "Louisiana";
    state_hash[23] = "Maine";
    state_hash[24] = "Maryland";
    state_hash[25] = "Massachusetts";
    state_hash[26] = "Michigan";
    state_hash[27] = "Minnesota";
    state_hash[28] = "Mississippi";
    state_hash[29] = "Missouri";
    state_hash[30] = "Montana";
    state_hash[31] = "Nebraska";
    state_hash[32] = "Nevada";
    state_hash[33] = "New Hampshire";
    state_hash[34] = "New Jersey";
    state_hash[35] = "New Mexico";
    state_hash[36] = "New York";
    state_hash[37] = "North Carolina";
    state_hash[38] = "North Dakota";
    state_hash[39] = "Ohio";
    state_hash[40] = "Oklahoma";
    state_hash[41] = "Oregon";
    state_hash[42] = "Pennsylvania";
    state_hash[44] = "Rhode Island";
    state_hash[45] = "South Carolina";
    state_hash[46] = "South Dakota";
    state_hash[47] = "Tennessee";
    state_hash[48] = "Texas";
    state_hash[49] = "Utah";
    state_hash[50] = "Vermont";
    state_hash[51] = "Virginia";
    state_hash[53] = "Washington";
    state_hash[54] = "West Virginia";
    state_hash[55] = "Wisconsin";
    state_hash[56] = "Wyoming";
    state_hash[60] = "American Samoa";
    state_hash[64] = "Federated States of Micronesia";
    state_hash[66] = "Guam";
    state_hash[67] = "Johnston Atoll";
    state_hash[68] = "Marshall Islands";
    state_hash[69] = "Northern Mariana Islands";
    state_hash[70] = "Palau";
    state_hash[71] = "Midway Islands";
    state_hash[72] = "Puerto Rico";
    state_hash[74] = "U.S. Minor Outlying Islands";
    state_hash[76] = "Navassa Island";
    state_hash[78] = "Virgin Islands of the U.S.";
    state_hash[79] = "Wake Island";
    state_hash[81] = "Baker Island";
    state_hash[84] = "Howland Island";
    state_hash[86] = "Jarvis Island";
    state_hash[89] = "Kingman Reef";
    state_hash[95] = "Palmyra Atoll";

    return state_hash[statefips_int] || 'Unknown';

}

// Control implemented as ES6 class
class DropdownCtrl {
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

// Control implemented as ES6 class
class LegendCtrl {
    
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.id = 'legend-ctrl';
        this._container.className = 'mapboxgl-ctrl';
        this._ptag = document.createElement('p');
        this._ptag.textContent = 'Removable Legend';
        this._container.appendChild(this._ptag);
        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
    
    remove() {
        this.onRemove(); // alias the onRemove function (which presumably is also used in internal functions by Mapbox GL JS)
    }
    
}

var computed_breaks = {
    "mhi": {
        "table": "b19013",
        "expression": "b19013001",
        "popup_label": "MHI: $",
        "default_color": "#fff",
        "null_color": "#fff",
        "zero_color": "#fff",
        "array": [
        {"break": 26527, color: "#ccece6"},
        {"break": 37201, color: "#99d8c9"},
        {"break": 44517, color: "#66c2a4"},
        {"break": 52137, color: "#41ae76"},
        {"break": 62302, color: "#238b45"},
        {"break": 77930, color: "#005824"}
        ]
    },
    "mhv": {
        "table": "b25077",
        "expression": "b25077001",
        "popup_label": "MHV: $",
        "default_color": "#fff",
        "null_color": "#fff",
        "zero_color": "#fff",
        "array": [
        {"break": 50000, color: "#eff3ff"},
        {"break": 100000, color: "#c6dbef"},
        {"break": 150000, color: "#9ecae1"},
        {"break": 200000, color: "#6baed6"},
        {"break": 300000, color: "#3182bd"},
        {"break": 500000, color: "#08519c"}
        ]
    },
};

var style = {
  "version": 8,
  "name": "Klokantech Basic",
  "metadata": {
    "mapbox:autocomposite": false,
    "mapbox:type": "template",
    "maputnik:renderer": "mbgljs"
  },
  "center": [
    8.54806714892635,
    47.37180823552663
  ],
  "zoom": 12.241790506353492,
  "bearing": 0,
  "pitch": 0,
  "sources": {
    "openmaptiles": {
      "attribution": "<a href='http://openmaptiles.org/'>©OpenMapTiles</a> <a href='www.openstreetmap.org/copyright' >©OpenStreetMap contributors</a>",
      "type": "vector",
      "tiles": [
        "https://red-meteor.com/mbtiles/united_states_of_america/{z}/{x}/{y}.pbf"
      ],
      "minZoom": 0,
      "maxZoom": 13,
      "maxzoom": 13
    },
    "county": {
      "type": "vector",
      "tiles": [
        "https://red-meteor.com/mbtiles/county_carto_2015/{z}/{x}/{y}.pbf"
      ],
      "minZoom": 0,
      "maxZoom": 13,
      "maxzoom": 13
    }
  },
  "glyphs": "https://free.tilehosting.com/fonts/{fontstack}/{range}.pbf?key=igsf1AR2UOc8hfBlRsM2",
  "layers": [

    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "hsl(47, 26%, 88%)"
      }
    },
    {
      "id": "landuse-residential",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landuse",
      "filter": [
            "all",
            [
              "==",
              "$type",
              "Polygon"
            ],
            [
              "==",
              "class",
              "residential"
            ]
          ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "hsl(47, 13%, 86%)",
        "fill-opacity": 0.7
      }
    }, {
      "id": "landcover_grass",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "filter": [
            "==",
            "class",
            "grass"
          ],
      "paint": {
        "fill-color": "hsl(82, 46%, 72%)",
        "fill-opacity": 0.45
      }
    }, {
      "id": "park",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "park",
      "paint": {
        "fill-color": "rgba(192, 216, 151, 0.53)",
        "fill-opacity": 1
      }
    }, {
      "id": "landcover_wood",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "filter": [
            "==",
            "class",
            "wood"
          ],
      "paint": {
        "fill-color": "hsl(82, 46%, 72%)",
        "fill-opacity": {
          "base": 1,
          "stops": [
                [
                  8,
                  0.6
                ],
                [
                  22,
                  1
                ]
              ]
        }
      }
    }, {
      "id": "water",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "water",
      "filter": [
            "==",
            "$type",
            "Polygon"
          ],
      "paint": {
        "fill-color": "hsl(205, 56%, 73%)"
      }
    }, {
      "id": "landcover-ice-shelf",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "filter": [
            "==",
            "subclass",
            "ice_shelf"
          ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "hsl(47, 26%, 88%)",
        "fill-opacity": 0.8
      }
    }, {
      "id": "landcover-glacier",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "filter": [
            "==",
            "subclass",
            "glacier"
          ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "hsl(47, 22%, 94%)",
        "fill-opacity": {
          "base": 1,
          "stops": [
                [
                  0,
                  1
                ],
                [
                  8,
                  0.5
                ]
              ]
        }
      }
    }, {
      "id": "landuse",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landuse",
      "filter": [
            "==",
            "class",
            "agriculture"
          ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#eae0d0"
      }
    }, {
      "id": "landuse_overlay_national_park",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "filter": [
            "==",
            "class",
            "national_park"
          ],
      "paint": {
        "fill-color": "#E1EBB0",
        "fill-opacity": {
          "base": 1,
          "stops": [
                [
                  5,
                  0
                ],
                [
                  9,
                  0.75
                ]
              ]
        }
      }
    }, {
      "id": "park_outline",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "park",
      "layout": {},
      "paint": {
        "line-color": "rgba(159, 183, 118, 0.69)",
        "line-dasharray": [
              0.5,
              1
            ]
      }
    }, {
      "id": "waterway",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "waterway",
      "filter": [
            "==",
            "$type",
            "LineString"
          ],
      "paint": {
        "line-color": "hsl(205, 56%, 73%)",
        "line-width": {
          "base": 1.4,
          "stops": [
                [
                  8,
                  1
                ],
                [
                  20,
                  8
                ]
              ]
        },
        "line-opacity": 1
      }
    }, {
      "id": "building",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "building",
      "paint": {
        "fill-color": "hsl(39, 41%, 86%)",
        "fill-outline-color": "hsl(36, 45%, 80%)",
        "fill-opacity": {
          "base": 1,
          "stops": [
                [
                  13,
                  0.6
                ],
                [
                  14,
                  1
                ]
              ]
        }
      }
    }, {
      "id": "housenumber",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "housenumber",
      "minzoom": 17,
      "filter": [
            "==",
            "$type",
            "Point"
          ],
      "layout": {
        "text-field": "{housenumber}",
        "text-size": 10,
        "text-font": [
              "Klokantech Noto Sans Regular",
              "Klokantech Noto Sans CJK Regular"
            ]
      },
      "paint": {
        "text-color": "hsla(0, 14%, 57%, 0.51)",
        "text-halo-color": "hsl(39, 41%, 86%)",
        "text-halo-width": 0.5
      }
    }, {
      "id": "road_path",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
            "all",
            [
              "==",
              "$type",
              "LineString"
            ],
            [
              "in",
              "class",
              "path",
              "track"
            ]
          ],
      "layout": {
        "line-cap": "square",
        "line-join": "bevel"
      },
      "paint": {
        "line-color": "hsl(0, 0%, 97%)",
        "line-dasharray": [
              1,
              1
            ],
        "line-width": {
          "base": 1.55,
          "stops": [
                [
                  4,
                  0.25
                ],
                [
                  20,
                  10
                ]
              ]
        }
      }
    }, {
      "id": "road_minor",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
            "all",
            [
              "==",
              "$type",
              "LineString"
            ],
            [
              "in",
              "class",
              "minor",
              "service"
            ]
          ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "hsl(0, 0%, 97%)",
        "line-width": {
          "base": 1.55,
          "stops": [
                [
                  4,
                  0.25
                ],
                [
                  20,
                  30
                ]
              ]
        }
      }
    }, {
      "id": "tunnel_minor",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
            "all",
            [
              "==",
              "$type",
              "LineString"
            ],
            [
              "==",
              "brunnel",
              "tunnel"
            ],
            [
              "==",
              "class",
              "minor_road"
            ]
          ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter"
      },
      "paint": {
        "line-color": "#efefef",
        "line-width": {
          "base": 1.55,
          "stops": [
                [
                  4,
                  0.25
                ],
                [
                  20,
                  30
                ]
              ]
        },
        "line-dasharray": [
              0.36,
              0.18
            ]
      }
    }, {
      "id": "tunnel_major",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
            "all",
            [
              "==",
              "$type",
              "LineString"
            ],
            [
              "==",
              "brunnel",
              "tunnel"
            ],
            [
              "in",
              "class",
              "primary",
              "secondary",
              "tertiary",
              "trunk"
            ]
          ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.4,
          "stops": [
                [
                  6,
                  0.5
                ],
                [
                  20,
                  30
                ]
              ]
        },
        "line-dasharray": [
              0.28,
              0.14
            ]
      }
    }, {
      "id": "road_trunk_primary",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
            "all",
            [
              "==",
              "$type",
              "LineString"
            ],
            [
              "in",
              "class",
              "trunk",
              "primary"
            ]
          ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.4,
          "stops": [
                [
                  6,
                  0.5
                ],
                [
                  20,
                  30
                ]
              ]
        }
      }
    }, {
      "id": "road_secondary_tertiary",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
            "all",
            [
              "==",
              "$type",
              "LineString"
            ],
            [
              "in",
              "class",
              "secondary",
              "tertiary"
            ]
          ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.4,
          "stops": [
                [
                  6,
                  0.5
                ],
                [
                  20,
                  20
                ]
              ]
        }
      }
    }, {
      "id": "road_major_motorway",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
            "all",
            [
              "==",
              "$type",
              "LineString"
            ],
            [
              "==",
              "class",
              "motorway"
            ]
          ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "hsl(0, 0%, 100%)",
        "line-width": {
          "base": 1.4,
          "stops": [
                [
                  8,
                  1
                ],
                [
                  16,
                  10
                ]
              ]
        },
        "line-offset": 0
      }
    }, {
      "id": "railway",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
            "==",
            "class",
            "rail"
          ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsl(34, 12%, 66%)",
        "line-opacity": {
          "base": 1,
          "stops": [
                [
                  11,
                  0
                ],
                [
                  16,
                  1
                ]
              ]
        }
      }
    }, {
      "id": "bridge_minor case",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
            "all",
            [
              "==",
              "$type",
              "LineString"
            ],
            [
              "==",
              "brunnel",
              "bridge"
            ],
            [
              "==",
              "class",
              "minor_road"
            ]
          ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter"
      },
      "paint": {
        "line-color": "#dedede",
        "line-width": {
          "base": 1.6,
          "stops": [
                [
                  12,
                  0.5
                ],
                [
                  20,
                  10
                ]
              ]
        },
        "line-gap-width": {
          "base": 1.55,
          "stops": [
                [
                  4,
                  0.25
                ],
                [
                  20,
                  30
                ]
              ]
        }
      }
    }, {
      "id": "bridge_major case",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
            "all",
            [
              "==",
              "$type",
              "LineString"
            ],
            [
              "==",
              "brunnel",
              "bridge"
            ],
            [
              "in",
              "class",
              "primary",
              "secondary",
              "tertiary",
              "trunk"
            ]
          ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter"
      },
      "paint": {
        "line-color": "#dedede",
        "line-width": {
          "base": 1.6,
          "stops": [
                [
                  12,
                  0.5
                ],
                [
                  20,
                  10
                ]
              ]
        },
        "line-gap-width": {
          "base": 1.55,
          "stops": [
                [
                  4,
                  0.25
                ],
                [
                  20,
                  30
                ]
              ]
        }
      }
    }, {
      "id": "bridge_minor",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
            "all",
            [
              "==",
              "$type",
              "LineString"
            ],
            [
              "==",
              "brunnel",
              "bridge"
            ],
            [
              "==",
              "class",
              "minor_road"
            ]
          ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#efefef",
        "line-width": {
          "base": 1.55,
          "stops": [
                [
                  4,
                  0.25
                ],
                [
                  20,
                  30
                ]
              ]
        }
      }
    }, {
      "id": "bridge_major",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
            "all",
            [
              "==",
              "$type",
              "LineString"
            ],
            [
              "==",
              "brunnel",
              "bridge"
            ],
            [
              "in",
              "class",
              "primary",
              "secondary",
              "tertiary",
              "trunk"
            ]
          ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.4,
          "stops": [
                [
                  6,
                  0.5
                ],
                [
                  20,
                  30
                ]
              ]
        }
      }
    }
, {
      "id": "county-fill",
      "type": "fill",
      "source": "county",
      "source-layer": "county",
      "maxzoom": 24,
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": {
          "property": "county",
          "type": "interval",
          "stops": [
            [1, "rgb(255, 255, 255)"],
            [10, "rgb(255, 255, 255)"],
            [100, "rgb(255, 255, 255)"]
        ]
        },
        "fill-opacity": 0
      }
    },

    {
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
    }, {
      "id": "admin_sub",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "boundary",
      "filter": [
            "in",
            "admin_level",
            4,
            6,
            8
          ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(50, 50, 50)",
        "line-opacity": 0.8,
        "line-width": 1.5,
        "line-dasharray": [
              2,
              1
            ]
      }
    }, {
      "id": "admin_country",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "boundary",
      "filter": [
            "all",
            [
              "<=",
              "admin_level",
              2
            ],
            [
              "==",
              "$type",
              "LineString"
            ]
          ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "hsla(0, 8%, 22%, 0.51)",
        "line-width": {
          "base": 1.3,
          "stops": [
                [
                  3,
                  0.5
                ],
                [
                  22,
                  15
                ]
              ]
        }
      }
    }, {
      "id": "poi_label",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "poi",
      "minzoom": 5,
      "filter": [
            "all",
            [
              "==",
              "$type",
              "Point"
            ],
            [
              "==",
              "rank",
              1
            ]
          ],
      "layout": {
        "text-size": 11,
        "text-font": [
              "Klokantech Noto Sans Regular",
              "Klokantech Noto Sans CJK Regular"
            ],
        "visibility": "visible",
        "text-offset": [
              0,
              0.5
            ],
        "icon-size": 1,
        "text-anchor": "top",
        "text-field": "{name}",
        "text-max-width": 8
      },
      "paint": {
        "text-color": "#666",
        "text-halo-width": 1,
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-blur": 1
      }
    }, {
      "id": "road_major_label",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "transportation_name",
      "filter": [
            "==",
            "$type",
            "LineString"
          ],
      "layout": {
        "symbol-placement": "line",
        "text-field": "{name}",
        "text-font": [
              "Klokantech Noto Sans Regular",
              "Klokantech Noto Sans CJK Regular"
            ],
        "text-transform": "uppercase",
        "text-letter-spacing": 0.1,
        "text-size": {
          "base": 1.4,
          "stops": [
                [
                  10,
                  8
                ],
                [
                  20,
                  14
                ]
              ]
        },
        "text-rotation-alignment": "map"
      },
      "paint": {
        "text-color": "#000",
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-width": 2
      }
    }, {
      "id": "place_label_other",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 8,
      "filter": [
            "all",
            [
              "==",
              "$type",
              "Point"
            ],
            [
              "!=",
              "class",
              "city"
            ]
          ],
      "layout": {
        "text-field": "{name_en}",
        "text-font": [
              "Klokantech Noto Sans Regular",
              "Klokantech Noto Sans CJK Regular"
            ],
        "text-max-width": 6,
        "text-size": {
          "stops": [
                [
                  6,
                  10
                ],
                [
                  12,
                  14
                ]
              ]
        },
        "visibility": "visible",
        "text-anchor": "center"
      },
      "paint": {
        "text-color": "hsl(0, 10%, 25%)",
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-blur": 0,
        "text-halo-width": 2
      }
    }, {
      "id": "place_label_city",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 16,
      "filter": [
            "all",
            [
              "==",
              "$type",
              "Point"
            ],
            [
              "==",
              "class",
              "city"
            ]
          ],
      "layout": {
        "text-field": "{name_en}",
        "text-font": [
              "Klokantech Noto Sans Regular",
              "Klokantech Noto Sans CJK Regular"
            ],
        "text-max-width": 10,
        "text-size": {
          "stops": [
                [
                  3,
                  12
                ],
                [
                  8,
                  16
                ]
              ]
        }
      },
      "paint": {
        "text-color": "hsl(0, 0%, 0%)",
        "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
        "text-halo-blur": 0,
        "text-halo-width": 2
      }
    }, {
      "id": "country_label",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 12,
      "filter": [
            "all",
            [
              "==",
              "$type",
              "Point"
            ],
            [
              "==",
              "class",
              "country"
            ]
          ],
      "layout": {
        "text-field": "{name}",
        "text-font": [
              "Klokantech Noto Sans Bold",
              "Klokantech Noto Sans CJK Bold"
            ],
        "text-max-width": 10,
        "text-size": {
          "stops": [
                [
                  3,
                  12
                ],
                [
                  8,
                  22
                ]
              ]
        }
      },
      "paint": {
        "text-color": "hsl(0, 0%, 13%)",
        "text-halo-color": "rgba(255,255,255,0.75)",
        "text-halo-width": 2,
        "text-halo-blur": 0
      }
    }
  ],
  "id": "ciwf4zbsv007y2pmt2rspc1dc"
};

/* global mapboxgl */
/* global fetch */

// set up map

var map = new mapboxgl.Map({
    container: 'map',
    style: style,
    zoom: 3,
    center: [-104, 39]
});

map.addControl(new mapboxgl.NavigationControl());

var dropdownCtrl = new DropdownCtrl();
map.addControl(dropdownCtrl, 'top-left');
var legendCtrl = new LegendCtrl();
map.addControl(legendCtrl, 'bottom-left');

// add map event listeners
// map.on('click', createPopup);

document.getElementById('acs_stat').addEventListener('change', updateMap, false);



function updateMap() {
    console.log(legendCtrl);
    window.setTimeout(function () {
        legendCtrl.remove();
    }, 5000);
    
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

}());

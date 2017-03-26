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
        this._option3 = document.createElement('option');
        this._option3.text = 'Population';
        this._option3.value = 'pop';
        this._select.appendChild(this._option1);
        this._select.appendChild(this._option2);
        this._select.appendChild(this._option3);


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
        this._container.className = 'mapboxgl-ctrl custom-control-style';
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

// Control implemented as ES6 class

class EasyButton {

    constructor(div_id, icon, title) {
        this.div_id = div_id;
        this.icon = icon;
        this.title = title;
    }

    onAdd(map) {
        this._map = map;
        this._container = document.createElement('button');
        this._container.className = "mapboxgl-ctrl custom-control-style";
        this._container.id = this.div_id;
        this._container.title = this.title;
        this._span = document.createElement('span');
        this._span.className = 'easy-btn fa fa-lg ' + this.icon;
        this._container.appendChild(this._span);
        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}

var computed_breaks = {
    "mhi": {
        "title": "Median Household Income",
        "table": "b19013",
        "expression": ["b19013001"],
        "popup_label": "MHI: $",
        "type": "currency",
        "default_color": "#fff",
        "null_color": "#fff",
        "zero_color": "#fff",
        "array_7": [0, 26527, 37201, 44517, 52137, 62302, 77930],
        "default_7": "mh2_7"
    },
    "mhv": {
        "title": "Median Home Value",
        "table": "b25077",
        "expression": ["b25077001"],
        "popup_label": "MHV: $",
        "type": "currency",
        "default_color": "#fff",
        "null_color": "#fff",
        "zero_color": "#fff",
        "array": [
            {
                "break": 50000,
                "color": "#eff3ff"
            },
            {
                "break": 100000,
                "color": "#c6dbef"
            },
            {
                "break": 150000,
                "color": "#9ecae1"
            },
            {
                "break": 200000,
                "color": "#6baed6"
            },
            {
                "break": 300000,
                "color": "#3182bd"
            },
            {
                "break": 500000,
                "color": "#08519c"
            }
        ]
    },
    "pop": {
        "title": "Total Population",
        "table": "b01001",
        "expression": ["b01001001"],
        "popup_label": "Population: ",
        "type": "number",
        "default_color": "#fff",
        "null_color": "#fff",
        "zero_color": "#fff",
        "array": [
            {
                "break": 50000,
                "color": "#eff3ff"
            },
            {
                "break": 100000,
                "color": "#c6dbef"
            },
            {
                "break": 150000,
                "color": "#9ecae1"
            },
            {
                "break": 200000,
                "color": "#6baed6"
            },
            {
                "break": 300000,
                "color": "#3182bd"
            },
            {
                "break": 500000,
                "color": "#08519c"
            }
        ]
    }
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

var colortree = {

    "mh1_5": [
            "#edf8fb",
            "#b2e2e2",
            "#66c2a4",
            "#2ca25f",
            "#006d2c"
        ],
    "mh1_7": [
            "#edf8fb",
            "#ccece6",
            "#99d8c9",
            "#66c2a4",
            "#41ae76",
            "#238b45",
            "#005824"
        ],
    "mh1_9": [
            "#f7fcfd",
            "#e5f5f9",
            "#ccece6",
            "#99d8c9",
            "#66c2a4",
            "#41ae76",
            "#238b45",
            "#006d2c",
            "#00441b"
        ],

    "mh2_5": [
            "#edf8fb",
            "#b3cde3",
            "#8c96c6",
            "#8856a7",
            "#810f7c"
        ],

    "mh2_7": [
            "#edf8fb",
            "#bfd3e6",
            "#9ebcda",
            "#8c96c6",
            "#8c6bb1",
            "#88419d",
            "#6e016b"
        ],

    "mh2_9": [
            "#f7fcfd",
            "#e0ecf4",
            "#bfd3e6",
            "#9ebcda",
            "#8c96c6",
            "#8c6bb1",
            "#88419d",
            "#810f7c",
            "#4d004b"
        ],

    "mh3_5": [
            "#f0f9e8",
            "#bae4bc",
            "#7bccc4",
            "#43a2ca",
            "#0868ac"
        ],
    "mh3_7": [
            "#f0f9e8",
            "#ccebc5",
            "#a8ddb5",
            "#7bccc4",
            "#4eb3d3",
            "#2b8cbe",
            "#08589e"
        ],
    "mh3_9": [
            "#f7fcf0",
            "#e0f3db",
            "#ccebc5",
            "#a8ddb5",
            "#7bccc4",
            "#4eb3d3",
            "#2b8cbe",
            "#0868ac",
            "#084081"
        ],
    "mh4_5": [
            "#fef0d9",
            "#fdcc8a",
            "#fc8d59",
            "#e34a33",
            "#b30000"
        ],
    "mh4_7": [
            "#fef0d9",
            "#fdd49e",
            "#fdbb84",
            "#fc8d59",
            "#ef6548",
            "#d7301f",
            "#990000"
        ],
    "mh4_9": [
            "#fff7ec",
            "#fee8c8",
            "#fdd49e",
            "#fdbb84",
            "#fc8d59",
            "#ef6548",
            "#d7301f",
            "#b30000",
            "#7f0000"
        ],
    "mh5_5": [
            "#f1eef6",
            "#bdc9e1",
            "#74a9cf",
            "#2b8cbe",
            "#045a8d"
        ],
    "mh5_7": [
            "#f1eef6",
            "#d0d1e6",
            "#a6bddb",
            "#74a9cf",
            "#3690c0",
            "#0570b0",
            "#034e7b"
        ],
    "mh5_9": [
            "#fff7fb",
            "#ece7f2",
            "#d0d1e6",
            "#a6bddb",
            "#74a9cf",
            "#3690c0",
            "#0570b0",
            "#045a8d",
            "#023858"
        ],
    "mh6_5": [
            "#f6eff7",
            "#bdc9e1",
            "#67a9cf",
            "#1c9099",
            "#016c59"
        ],
    "mh6_7": [
            "#f6eff7",
            "#d0d1e6",
            "#a6bddb",
            "#67a9cf",
            "#3690c0",
            "#02818a",
            "#016450"
        ],
    "mh6_9": [
            "#fff7fb",
            "#ece2f0",
            "#d0d1e6",
            "#a6bddb",
            "#67a9cf",
            "#3690c0",
            "#02818a",
            "#016c59",
            "#014636"
        ],
    "mh7_5": [
            "#f1eef6",
            "#d7b5d8",
            "#df65b0",
            "#dd1c77",
            "#980043"
        ],
    "mh7_7": [
            "#f1eef6",
            "#d4b9da",
            "#c994c7",
            "#df65b0",
            "#e7298a",
            "#ce1256",
            "#91003f"
        ],
    "mh7_9": [
            "#f7f4f9",
            "#e7e1ef",
            "#d4b9da",
            "#c994c7",
            "#df65b0",
            "#e7298a",
            "#ce1256",
            "#980043",
            "#67001f"
        ],
    "mh8_5": [
            "#feebe2",
            "#fbb4b9",
            "#f768a1",
            "#c51b8a",
            "#7a0177"
        ],
    "mh8_7": [
            "#feebe2",
            "#fcc5c0",
            "#fa9fb5",
            "#f768a1",
            "#dd3497",
            "#ae017e",
            "#7a0177"
        ],
    "mh8_9": [
            "#fff7f3",
            "#fde0dd",
            "#fcc5c0",
            "#fa9fb5",
            "#f768a1",
            "#dd3497",
            "#ae017e",
            "#7a0177",
            "#49006a"
        ],
    "mh9_5": [
            "#ffffcc",
            "#c2e699",
            "#78c679",
            "#31a354",
            "#006837"
        ],
    "mh9_7": [
            "#ffffcc",
            "#d9f0a3",
            "#addd8e",
            "#78c679",
            "#41ab5d",
            "#238443",
            "#005a32"
        ],
    "mh9_9": [
            "#ffffe5",
            "#f7fcb9",
            "#d9f0a3",
            "#addd8e",
            "#78c679",
            "#41ab5d",
            "#238443",
            "#006837",
            "#004529"
        ],
    "mh10_5": [
            "#ffffcc",
            "#a1dab4",
            "#41b6c4",
            "#2c7fb8",
            "#253494"
        ],
    "mh10_7": [
            "#ffffcc",
            "#c7e9b4",
            "#7fcdbb",
            "#41b6c4",
            "#1d91c0",
            "#225ea8",
            "#0c2c84"
        ],
    "mh10_9": [
            "#ffffd9",
            "#edf8b1",
            "#c7e9b4",
            "#7fcdbb",
            "#41b6c4",
            "#1d91c0",
            "#225ea8",
            "#253494",
            "#081d58"
        ],
    "mh11_5": [
            "#ffffd4",
            "#fed98e",
            "#fe9929",
            "#d95f0e",
            "#993404"
        ],
    "mh11_7": [
            "#ffffd4",
            "#fee391",
            "#fec44f",
            "#fe9929",
            "#ec7014",
            "#cc4c02",
            "#8c2d04"
        ],
    "mh11_9": [
            "#ffffe5",
            "#fff7bc",
            "#fee391",
            "#fec44f",
            "#fe9929",
            "#ec7014",
            "#cc4c02",
            "#993404",
            "#662506"
        ],
    "mh12_5": [
            "#ffffb2",
            "#fecc5c",
            "#fd8d3c",
            "#f03b20",
            "#bd0026"
        ],
    "mh12_7": [
            "#ffffb2",
            "#fed976",
            "#feb24c",
            "#fd8d3c",
            "#fc4e2a",
            "#e31a1c",
            "#b10026"
        ],
    "mh12_9": [
            "#ffffcc",
            "#ffeda0",
            "#fed976",
            "#feb24c",
            "#fd8d3c",
            "#fc4e2a",
            "#e31a1c",
            "#bd0026",
            "#800026"
        ],
    "sh1_5": [
            "#eff3ff",
            "#bdd7e7",
            "#6baed6",
            "#3182bd",
            "#08519c"
        ],
    "sh1_7": [
            "#eff3ff",
            "#c6dbef",
            "#9ecae1",
            "#6baed6",
            "#4292c6",
            "#2171b5",
            "#084594"
        ],
    "sh1_9": [
            "#f7fbff",
            "#deebf7",
            "#c6dbef",
            "#9ecae1",
            "#6baed6",
            "#4292c6",
            "#2171b5",
            "#08519c",
            "#08306b"
        ],
    "sh2_5": [
            "#edf8e9",
            "#bae4b3",
            "#74c476",
            "#31a354",
            "#006d2c"
        ],
    "sh2_7": [
            "#edf8e9",
            "#c7e9c0",
            "#a1d99b",
            "#74c476",
            "#41ab5d",
            "#238b45",
            "#005a32"
        ],
    "sh2_9": [
            "#f7fcf5",
            "#e5f5e0",
            "#c7e9c0",
            "#a1d99b",
            "#74c476",
            "#41ab5d",
            "#238b45",
            "#006d2c",
            "#00441b"
        ],
    "sh3_5": [
            "#f7f7f7",
            "#cccccc",
            "#969696",
            "#636363",
            "#252525"
        ],
    "sh3_7": [
            "#f7f7f7",
            "#d9d9d9",
            "#bdbdbd",
            "#969696",
            "#737373",
            "#525252",
            "#252525"
        ],
    "sh3_9": [
            "#ffffff",
            "#f0f0f0",
            "#d9d9d9",
            "#bdbdbd",
            "#969696",
            "#737373",
            "#525252",
            "#252525",
            "#000000"
        ],
    "sh4_5": [
            "#feedde",
            "#fdbe85",
            "#fd8d3c",
            "#e6550d",
            "#a63603"
        ],
    "sh4_7": [
            "#feedde",
            "#fdd0a2",
            "#fdae6b",
            "#fd8d3c",
            "#f16913",
            "#d94801",
            "#8c2d04"
        ],
    "sh4_9": [
            "#fff5eb",
            "#fee6ce",
            "#fdd0a2",
            "#fdae6b",
            "#fd8d3c",
            "#f16913",
            "#d94801",
            "#a63603",
            "#7f2704"
        ],
    "sh5_5": [
            "#f2f0f7",
            "#cbc9e2",
            "#9e9ac8",
            "#756bb1",
            "#54278f"
        ],
    "sh5_7": [
            "#f2f0f7",
            "#dadaeb",
            "#bcbddc",
            "#9e9ac8",
            "#807dba",
            "#6a51a3",
            "#4a1486"
        ],
    "sh5_9": [
            "#fcfbfd",
            "#efedf5",
            "#dadaeb",
            "#bcbddc",
            "#9e9ac8",
            "#807dba",
            "#6a51a3",
            "#54278f",
            "#3f007d"
        ],
    "sh6_5": [
            "#fee5d9",
            "#fcae91",
            "#fb6a4a",
            "#de2d26",
            "#a50f15"
        ],
    "sh6_7": [
            "#fee5d9",
            "#fcbba1",
            "#fc9272",
            "#fb6a4a",
            "#ef3b2c",
            "#cb181d",
            "#99000d"
        ],
    "sh6_9": [
            "#fff5f0",
            "#fee0d2",
            "#fcbba1",
            "#fc9272",
            "#fb6a4a",
            "#ef3b2c",
            "#cb181d",
            "#a50f15",
            "#67000d"
        ],
    "ds1_5": [
            "#a6611a",
            "#dfc27d",
            "#f5f5f5",
            "#80cdc1",
            "#018571"
        ],
    "ds1_7": [
            "#8c510a",
            "#d8b365",
            "#f6e8c3",
            "#f5f5f5",
            "#c7eae5",
            "#5ab4ac",
            "#01665e"
        ],
    "ds1_8": [
            "#8c510a",
            "#bf812d",
            "#dfc27d",
            "#f6e8c3",
            "#c7eae5",
            "#80cdc1",
            "#35978f",
            "#01665e"
        ],
    "ds1_9": [
            "#8c510a",
            "#bf812d",
            "#dfc27d",
            "#f6e8c3",
            "#f5f5f5",
            "#c7eae5",
            "#80cdc1",
            "#35978f",
            "#01665e"
        ],
    "ds1_11": [
            "#543005",
            "#8c510a",
            "#bf812d",
            "#dfc27d",
            "#f6e8c3",
            "#f5f5f5",
            "#c7eae5",
            "#80cdc1",
            "#35978f",
            "#01665e",
            "#003c30"
        ],
    "ds2_5": [
            "#d01c8b",
            "#f1b6da",
            "#f7f7f7",
            "#b8e186",
            "#4dac26"
        ],
    "ds2_7": [
            "#c51b7d",
            "#e9a3c9",
            "#fde0ef",
            "#f7f7f7",
            "#e6f5d0",
            "#a1d76a",
            "#4d9221"
        ],
    "ds2_8": [
            "#c51b7d",
            "#de77ae",
            "#f1b6da",
            "#fde0ef",
            "#e6f5d0",
            "#b8e186",
            "#7fbc41",
            "#4d9221"
        ],
    "ds2_9": [
            "#c51b7d",
            "#de77ae",
            "#f1b6da",
            "#fde0ef",
            "#f7f7f7",
            "#e6f5d0",
            "#b8e186",
            "#7fbc41",
            "#4d9221"
        ],
    "ds2_11": [
            "#8e0152",
            "#c51b7d",
            "#de77ae",
            "#f1b6da",
            "#fde0ef",
            "#f7f7f7",
            "#e6f5d0",
            "#b8e186",
            "#7fbc41",
            "#4d9221",
            "#276419"
        ],
    "ds3_5": [
            "#7b3294",
            "#c2a5cf",
            "#f7f7f7",
            "#a6dba0",
            "#008837"
        ],
    "ds3_7": [
            "#762a83",
            "#af8dc3",
            "#e7d4e8",
            "#f7f7f7",
            "#d9f0d3",
            "#7fbf7b",
            "#1b7837"
        ],
    "ds3_8": [
            "#762a83",
            "#9970ab",
            "#c2a5cf",
            "#e7d4e8",
            "#d9f0d3",
            "#a6dba0",
            "#5aae61",
            "#1b7837"
        ],
    "ds3_9": [
            "#762a83",
            "#9970ab",
            "#c2a5cf",
            "#e7d4e8",
            "#f7f7f7",
            "#d9f0d3",
            "#a6dba0",
            "#5aae61",
            "#1b7837"
        ],
    "ds3_11": [
            "#40004b",
            "#762a83",
            "#9970ab",
            "#c2a5cf",
            "#e7d4e8",
            "#f7f7f7",
            "#d9f0d3",
            "#a6dba0",
            "#5aae61",
            "#1b7837",
            "#00441b"
        ],
    "ds4_5": [
            "#e66101",
            "#fdb863",
            "#f7f7f7",
            "#b2abd2",
            "#5e3c99"
        ],
    "ds4_7": [
            "#b35806",
            "#f1a340",
            "#fee0b6",
            "#f7f7f7",
            "#d8daeb",
            "#998ec3",
            "#542788"
        ],
    "ds4_8": [
            "#b35806",
            "#e08214",
            "#fdb863",
            "#fee0b6",
            "#d8daeb",
            "#b2abd2",
            "#8073ac",
            "#542788"
        ],
    "ds4_9": [
            "#b35806",
            "#e08214",
            "#fdb863",
            "#fee0b6",
            "#f7f7f7",
            "#d8daeb",
            "#b2abd2",
            "#8073ac",
            "#542788"
        ],
    "ds4_11": [
            "#7f3b08",
            "#b35806",
            "#e08214",
            "#fdb863",
            "#fee0b6",
            "#f7f7f7",
            "#d8daeb",
            "#b2abd2",
            "#8073ac",
            "#542788",
            "#2d004b"
        ],
    "ds5_5": [
            "#ca0020",
            "#f4a582",
            "#f7f7f7",
            "#92c5de",
            "#0571b0"
        ],
    "ds5_7": [
            "#b2182b",
            "#ef8a62",
            "#fddbc7",
            "#f7f7f7",
            "#d1e5f0",
            "#67a9cf",
            "#2166ac"
        ],
    "ds5_8": [
            "#b2182b",
            "#d6604d",
            "#f4a582",
            "#fddbc7",
            "#d1e5f0",
            "#92c5de",
            "#4393c3",
            "#2166ac"
        ],
    "ds5_9": [
            "#b2182b",
            "#d6604d",
            "#f4a582",
            "#fddbc7",
            "#f7f7f7",
            "#d1e5f0",
            "#92c5de",
            "#4393c3",
            "#2166ac"
        ],
    "ds5_11": [
            "#67001f",
            "#b2182b",
            "#d6604d",
            "#f4a582",
            "#fddbc7",
            "#f7f7f7",
            "#d1e5f0",
            "#92c5de",
            "#4393c3",
            "#2166ac",
            "#053061"
        ],
    "ds6_5": [
            "#ca0020",
            "#f4a582",
            "#ffffff",
            "#bababa",
            "#404040"
        ],
    "ds6_7": [
            "#b2182b",
            "#ef8a62",
            "#fddbc7",
            "#ffffff",
            "#e0e0e0",
            "#999999",
            "#4d4d4d"
        ],
    "ds6_8": [
            "#b2182b",
            "#d6604d",
            "#f4a582",
            "#fddbc7",
            "#e0e0e0",
            "#bababa",
            "#878787",
            "#4d4d4d"
        ],
    "ds6_9": [
            "#b2182b",
            "#d6604d",
            "#f4a582",
            "#fddbc7",
            "#ffffff",
            "#e0e0e0",
            "#bababa",
            "#878787",
            "#4d4d4d"
        ],
    "ds6_11": [
            "#67001f",
            "#b2182b",
            "#d6604d",
            "#f4a582",
            "#fddbc7",
            "#ffffff",
            "#e0e0e0",
            "#bababa",
            "#878787",
            "#4d4d4d",
            "#1a1a1a"
        ],
    "ds7_5": [
            "#d7191c",
            "#fdae61",
            "#ffffbf",
            "#abd9e9",
            "#2c7bb6"
        ],
    "ds7_7": [
            "#d73027",
            "#fc8d59",
            "#fee090",
            "#ffffbf",
            "#e0f3f8",
            "#91bfdb",
            "#4575b4"
        ],
    "ds7_8": [
            "#d73027",
            "#f46d43",
            "#fdae61",
            "#fee090",
            "#e0f3f8",
            "#abd9e9",
            "#74add1",
            "#4575b4"
        ],
    "ds7_9": [
            "#d73027",
            "#f46d43",
            "#fdae61",
            "#fee090",
            "#ffffbf",
            "#e0f3f8",
            "#abd9e9",
            "#74add1",
            "#4575b4"
        ],
    "ds7_11": [
            "#a50026",
            "#d73027",
            "#f46d43",
            "#fdae61",
            "#fee090",
            "#ffffbf",
            "#e0f3f8",
            "#abd9e9",
            "#74add1",
            "#4575b4",
            "#313695"
        ],
    "ds8_5": [
            "#d7191c",
            "#fdae61",
            "#ffffbf",
            "#a6d96a",
            "#1a9641"
        ],
    "ds8_7": [
            "#d73027",
            "#fc8d59",
            "#fee08b",
            "#ffffbf",
            "#d9ef8b",
            "#91cf60",
            "#1a9850"
        ],
    "ds8_8": [
            "#d73027",
            "#f46d43",
            "#fdae61",
            "#fee08b",
            "#d9ef8b",
            "#a6d96a",
            "#66bd63",
            "#1a9850"
        ],
    "ds8_9": [
            "#d73027",
            "#f46d43",
            "#fdae61",
            "#fee08b",
            "#ffffbf",
            "#d9ef8b",
            "#a6d96a",
            "#66bd63",
            "#1a9850"
        ],
    "ds8_11": [
            "#a50026",
            "#d73027",
            "#f46d43",
            "#fdae61",
            "#fee08b",
            "#ffffbf",
            "#d9ef8b",
            "#a6d96a",
            "#66bd63",
            "#1a9850",
            "#006837"
        ],
    "ds9_5": [
            "#d7191c",
            "#fdae61",
            "#ffffbf",
            "#abdda4",
            "#2b83ba"
        ],
    "ds9_7": [
            "#d53e4f",
            "#fc8d59",
            "#fee08b",
            "#ffffbf",
            "#e6f598",
            "#99d594",
            "#3288bd"
        ],
    "ds9_8": [
            "#d53e4f",
            "#f46d43",
            "#fdae61",
            "#fee08b",
            "#e6f598",
            "#abdda4",
            "#66c2a5",
            "#3288bd"
        ],
    "ds9_9": [
            "#d53e4f",
            "#f46d43",
            "#fdae61",
            "#fee08b",
            "#ffffbf",
            "#e6f598",
            "#abdda4",
            "#66c2a5",
            "#3288bd"
        ],
    "ds9_11": [
            "#9e0142",
            "#d53e4f",
            "#f46d43",
            "#fdae61",
            "#fee08b",
            "#ffffbf",
            "#e6f598",
            "#abdda4",
            "#66c2a5",
            "#3288bd",
            "#5e4fa2"
        ]
};

function updateLegend(current_dropdown_value) {

    let legend_breaks = computed_breaks[current_dropdown_value].array_7;
    let colorscheme = computed_breaks[current_dropdown_value].default_7;
    let type = computed_breaks[current_dropdown_value].type;
    let default_color = computed_breaks[current_dropdown_value].default_color;
    let title = computed_breaks[current_dropdown_value].title;

    let html_string = "<div class='legend-title-text'>" + title + "</div>"; // inner HTML to be inserted into legend

    for (let i = legend_breaks.length - 1; i > -1; i--) {
        html_string += '<div><span class="legend-box" style="background-color:' + colortree[colorscheme][i] +
            ';"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + formatValue(legend_breaks[i], type) + '</div>';
    }

    // default color
    html_string += '<div><span class="legend-box" style="background-color:' + default_color +
        ';"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;&nbsp;' + formatValue(legend_breaks[0], type) + '</div>';

    document.getElementById('legend-ctrl').innerHTML = html_string;

}


function formatValue(val, type) {

    if (type === 'currency') {
        return ' $' + val.toLocaleString();
    }
    if (type === 'number') {
        return val.toLocaleString();
    }
}

/* global mapboxgl */
/* global fetch */
/* global exprEval */

var map = new mapboxgl.Map({
    container: 'map',
    style: style,
    zoom: 3,
    center: [-104, 39]
});

map.addControl(new EasyButton('custom_search', 'fa-search', 'Search'), 'top-right');

map.addControl(new mapboxgl.NavigationControl());

map.addControl(new DropdownCtrl(), 'top-left');
map.addControl(new LegendCtrl(), 'bottom-right');

map.addControl(new EasyButton('choose_statistic', 'fa-bars', 'Select a Statistic'), 'top-left');
map.addControl(new EasyButton('choose_geography', 'fa-compass', 'Change the Geography Layer'), 'top-left');
map.addControl(new EasyButton('view_table', 'fa-table', 'View a Data Table'), 'top-left');
map.addControl(new EasyButton('view_chart', 'fa-line-chart', 'View a Chart'), 'top-left');
map.addControl(new EasyButton('save_map', 'fa-floppy-o', 'Save a Map Image'), 'top-left');
map.addControl(new EasyButton('clear_selection', 'fa-eraser', 'Clear Selection'), 'top-left');

// add map event listeners
// map.on('click', createPopup);

document.getElementById('acs_stat').addEventListener('change', updateMap, false);
document.getElementById('choose_statistic').addEventListener('click', clickChooseStatistic, false);




function clickChooseStatistic() {
    console.log('choose_statistic clicked');
}

function updateMap() {

    if (map.popup) {
        map.popup.remove();
    }

    var current_dropdown_value = getSelectValues(document.getElementById('acs_stat'))[0];

    updateLegend(current_dropdown_value);


    fetchCensusData(current_dropdown_value).then((acs_data) => {
        map.on('click', function (e) {
            var map_reference = this;
            createPopup(e, acs_data, current_dropdown_value, map_reference);
        });
        map.setPaintProperty('county-fill', 'fill-opacity', 0.8); // make county-fill layer visible
        map.setPaintProperty('county-fill', 'fill-color', getMapStyle(current_dropdown_value, acs_data));
    });
}

function fetchCensusData(style_code) {
    // load census data
    return fetch('https://gis.dola.colorado.gov/capi/demog?limit=99999&db=acs1115&table=' + computed_breaks[style_code].table + '&sumlev=50').then(function (fetch_response) {
        return fetch_response.json();
    }).then(function (census_response) {
        return census_response.data;
    });
}

function getMapStyle(style_code, acs_data) {

    let expression = computed_breaks[style_code].expression;
    let default_color = "#fff"; // lowest break color
    let null_color = "#fff";
    let zero_color = "#fff";
    let array = computed_breaks[style_code].array_7;
    let colorscheme = computed_breaks[style_code].default_7;

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
                color = colortree[colorscheme][i];
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


    map_reference.popup = new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(geoname + " County, " + state + "<br />" + label + " " + popup_stat)
        .addTo(map_reference);
}


function getPopupStat(geonum, expression, acs_data) {

    var stat = null;

    // set up parser (https://github.com/silentmatt/expr-eval)
    var parser = new exprEval.Parser();
    var exp = parser.parse(expression.join(""));

    let replacers_object = {};

    for (var i = 0; i < acs_data.length; i++) {
        if (acs_data[i].geonum === geonum.toString()) {

            getUniqueExpressionKeys(expression).forEach(function (key) {
                replacers_object[key] = acs_data[i][key];
            });

            stat = exp.evaluate(replacers_object);
            break;
        }
    }

    return parseInt(stat, 10).toLocaleString() || 'Unknown';
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

}());
//# sourceMappingURL=bundle.js.map

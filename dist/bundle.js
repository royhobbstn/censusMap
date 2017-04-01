(function () {
'use strict';

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

var computed_breaks = {"acs1115":{"mhi":{"msa":{"ckmeans5":[69869,54744,45176,35031],"ckmeans7":[26172,38140,45287,52177,61504,80060],"ckmeans9":[80060,65614,57721,51700,46162,40743,35031,26172],"stddev7":[61481.40966303774,56312.27310869183,51143.13655434591,45974,40804.86344565409,35635.72689130817,30466.59033696226],"stddev8":[71819.68277172957,61481.40966303774,51143.13655434591,40804.86344565409,30466.59033696226,20128.317228270433],"quantile5":[53437,48472,43855,39538],"quantile7":[55878,50717,47668,44497,41618,37745],"quantile9":[57889,52603,49930,47253,44736,42439,40308,36398],"quantile11":[59805,54047,50998,49331,47093,45075,43123,41332,38983,35556],"min":10499,"max":101934,"mean":46855.62325080732,"median":45974,"stddev":10338.273108691827,"sample":[]},"county":{"ckmeans5":[76101,59392,47468,38159],"ckmeans7":[34974,42168,49179,57993,68838,83700],"ckmeans9":[89860,75619,63628,55247,48817,43073,37321,30468],"stddev7":[63840.39200250614,57393.09466833743,50945.79733416872,44498.5,38051.20266583128,31603.905331662572,25156.60799749386],"stddev8":[76734.98667084357,63840.39200250614,50945.79733416872,38051.20266583128,25156.60799749386,12262.01332915643],"quantile5":[54191,47318,42223,36654],"quantile7":[58228,51092,46495,42905,39285,35000],"quantile9":[62372,53379,49227,45965,43355,40561,37653,33965],"quantile11":[65670,55432,51387,48225,45751,43586,41268,38955,36289,32819],"min":19501,"max":110238,"mean":46888.278,"median":44498.5,"stddev":12894.594668337428,"sample":[]},"cbsa":{"ckmeans5":[65127,53928,45569,32933],"ckmeans7":[32933,43420,48791,55155,62374,78764],"ckmeans9":[78764,65127,56092,50830,47074,43167,37406,27476],"stddev7":[61967.557430499466,57431.03828699964,52894.51914349982,48358,43821.48085650018,39284.96171300036,34748.442569500534],"stddev8":[71040.5957174991,61967.557430499466,52894.51914349982,43821.48085650018,34748.442569500534,25675.404282500895],"quantile5":[55155,50119,46847,42759],"quantile7":[57938,52151,49535,47142,44711,41703],"quantile9":[59501,53928,51384,49322,47339,45684,43420,40947],"quantile11":[60149,56318,52286,50830,49159,47401,46049,44503,42369,39965],"min":15440,"max":82089,"mean":49005.00591715976,"median":48358,"stddev":9073.038286999643,"sample":[]},"state":{"ckmeans5":[66779,56852,49255,39665],"ckmeans7":[39665,46868,50957,56852,65015,69515],"ckmeans9":[69515,65015,58840,55176,50957,46868,43623,39665],"stddev7":[67906.3385694381,62804.559046292066,57702.77952314603,52601,47499.22047685397,42397.440953707934,37295.66143056191],"stddev8":[78109.89761573015,67906.3385694381,57702.77952314603,47499.22047685397,37295.66143056191,27092.10238426984],"quantile5":[61492,55176,49620,46868],"quantile7":[66779,60509,53357,50957,47583,45047],"quantile9":[69515,61062,57574,53207,51243,49331,46879,43740],"quantile11":[70331,61818,60509,57181,53207,51243,49429,47583,45483,43623],"min":19350,"max":74551,"mean":53957.519230769234,"median":52601,"stddev":10203.559046292063,"sample":[]},"tract":{"ckmeans5":[175048,110208,73784,45809],"ckmeans7":[31250,49338,67596,90500,123456,185641],"ckmeans9":[185641,132344,103273,83900,67773,53690,39375,19271],"stddev7":[109577.70305538282,92126.30203692187,74674.90101846094,57223.5,39772.098981539064,22320.69796307812,4869.296944617177],"stddev8":[144480.5050923047,109577.70305538282,74674.90101846094,39772.098981539064,4869.296944617177,-30033.505092304695],"quantile5":[86180.5,64382,51255.5,38977.5],"quantile7":[96058,75625,62209,52727,44783,35326],"quantile9":[102455,82750,70238,61469,53407,47500,40750,32366],"quantile11":[107266,89097,76902,67888,60571,54224,48983,43990,37877,30023],"min":0,"max":250001,"mean":64728.771,"median":57223.5,"stddev":34902.80203692188,"sample":[]},"place":{"ckmeans5":[154018,77127,49286,19792],"ckmeans7":[14177,34583,49442,67164,91779,169375],"ckmeans9":[207500,119423,92462,75417,60887,47065,34000,14177],"stddev7":[90750.2871396358,76140.02475975719,61529.76237987859,46919.5,32309.237620121403,17698.975240242806,3088.712860364205],"stddev8":[119970.81189939298,90750.2871396358,61529.76237987859,32309.237620121403,3088.712860364205,-26131.811899392982],"quantile5":[70948.5,53750,41250,30854],"quantile7":[78500,62969,51591,42344,36250,24792],"quantile9":[82250,68929,58594,50614,43250,38750,32083,20000],"quantile11":[85384,72692,63691,56071,50000,43750,40000,35659,29063,0],"min":0,"max":250001,"mean":49904.696,"median":46919.5,"stddev":29220.524759757194,"sample":[]},"zcta":{"ckmeans5":[121591,83802,59519,32275],"ckmeans7":[25000,47167,63491,79188,98475,130032],"ckmeans9":[165745,124217,98666,81438,67197,52875,32928,10816],"stddev7":[112426.93474664689,95774.4564977646,79121.9782488823,62469.5,45817.0217511177,29164.543502235407,12512.06525335311],"stddev8":[145731.89124441147,112426.93474664689,79121.9782488823,45817.0217511177,12512.06525335311,-20792.891244411483],"quantile5":[86927,70148.5,55952,31621],"quantile7":[93409,78370,67736,58163,45295,20598],"quantile9":[100200,84932,74826,66198,59519,50108,36592,17229],"quantile11":[104231,88766,80148,72143,65521,60000,51849,44000,29667,15674],"min":0,"max":199519,"mean":62229.247,"median":62469.5,"stddev":33304.95649776459,"sample":[]},"countysub":{"ckmeans5":[145902,76912,48125,23178],"ckmeans7":[16522,36593,50208,68232,97836,162907],"ckmeans9":[162907,100177,76912,60673,48348,38684,29835,13652],"stddev7":[76664.20174849319,65218.63449899547,53773.06724949773,42327.5,30881.932750502267,19436.365501004537,7990.798251506807],"stddev8":[99555.33624748865,76664.20174849319,53773.06724949773,30881.932750502267,7990.798251506807,-14900.33624748866],"quantile5":[59592,46147.5,39502.5,32311.5],"quantile7":[66465,52500,44934,40375,35313,29835],"quantile9":[70376,57500,50000,44337,40794,36873,33096,27792],"quantile11":[73594,61201,53581,48125,43909,41221,38250,35000,31645,26676],"min":0,"max":217171,"mean":46673.37,"median":42327.5,"stddev":22891.134498995463,"sample":[]},"bg":{"ckmeans5":[62013,45325,32738,17153],"ckmeans7":[11436,25993,35720,45325,56573,73092],"ckmeans9":[76042,61544,52532,45000,37548,30541,22850,11436],"stddev7":[62712.14721896483,54849.43147930989,46986.715739654945,39124,31261.284260345055,23398.568520690114,15535.852781035173],"stddev8":[78437.57869827471,62712.14721896483,46986.715739654945,31261.284260345055,15535.852781035173,-189.57869827471586],"quantile5":[51453.5,42502,35500,27291.5],"quantile7":[54875,47850,41276,36534,31351,24458],"quantile9":[57039,50714,45524,41029,36887,32853,28854,22333],"quantile11":[59333,52045,48279,43917,40714,37353,34167,31029,26654,20588],"min":0,"max":97917,"mean":39621.727,"median":39124,"stddev":15725.431479309886,"sample":[]}},"mhv":{"msa":{"ckmeans5":[412000,258700,177800,122100],"ckmeans7":[105400,140000,182500,242900,363500,578800],"ckmeans9":[578800,412000,308400,236600,187700,150200,121700,96300],"stddev7":[240226.18455324578,202084.1230354972,163942.0615177486,125800,87657.9384822514,49515.87696450281,11373.815446754219],"stddev8":[316510.307588743,240226.18455324578,163942.0615177486,87657.9384822514,11373.815446754219,-64910.30758874299],"quantile5":[179100,138400,113600,96000],"quantile7":[200200,159400,134200,116300,104300,90600],"quantile9":[217100,171500,150500,132900,119000,108200,98100,87100],"quantile11":[231500,185700,161800,144700,131700,120100,110600,102800,94100,85100],"min":44600,"max":688500,"mean":146600.21528525295,"median":125800,"stddev":76284.12303549719,"sample":[]},"state":{"ckmeans5":[475800,315900,215900,153800],"ckmeans7":[153800,215900,259500,315900,385500,475800],"ckmeans9":[475800,385500,315900,270500,231500,186200,153800,129200],"stddev7":[296858.94711092615,253205.96474061743,209552.98237030872,165900,122247.01762969128,78594.03525938255,34941.05288907382],"stddev8":[384164.9118515436,296858.94711092615,209552.98237030872,122247.01762969128,34941.05288907382,-52364.91185154361],"quantile5":[247800,186200,153800,129900],"quantile7":[270500,237300,173800,159000,138400,124200],"quantile9":[286900,245000,215900,173700,160300,142100,132000,122400],"quantile11":[315900,250000,237300,194800,173700,160300,144100,138400,129200,120500],"min":103100,"max":515300,"mean":196107.6923076923,"median":165900,"stddev":87305.96474061745,"sample":[]},"county":{"ckmeans5":[543100,319200,192800,116900],"ckmeans7":[101400,146700,208200,295000,416000,620700],"ckmeans9":[698600,509700,416000,308400,233400,177700,134200,96300],"stddev7":[250863.60695476955,204975.73796984635,159087.86898492317,113200,67312.13101507683,21424.262030153637,-24463.60695476955],"stddev8":[342639.3449246159,250863.60695476955,159087.86898492317,67312.13101507683,-24463.60695476955,-116239.3449246159],"quantile5":[175450,126750,99400,81750],"quantile7":[203300,152400,122700,102700,87300,76300],"quantile9":[228500,167700,140300,121200,105500,92600,83300,72700],"quantile11":[246600,185900,155700,133800,119800,107300,95400,86200,80700,69400],"min":0,"max":815100,"mean":140324.7,"median":113200,"stddev":91775.73796984636,"sample":[]},"cbsa":{"ckmeans5":[558300,268800,179800,132800],"ckmeans7":[114600,143300,179800,243000,328800,558300],"ckmeans9":[558300,363700,268800,214900,179800,146300,124300,106200],"stddev7":[233383.3192455884,202055.5461637256,170727.7730818628,139400,108072.2269181372,76744.45383627439,45416.68075441159],"stddev8":[296038.86540931405,233383.3192455884,170727.7730818628,108072.2269181372,45416.68075441159,-17238.86540931402],"quantile5":[183300,152400,130000,115000],"quantile7":[193900,162500,150100,131800,120800,107900],"quantile9":[214900,170600,157000,148100,133800,124700,116400,104500],"quantile11":[223900,186800,164200,154400,147800,133800,126500,120100,112900,103200],"min":77900,"max":558300,"mean":155079.88165680473,"median":139400,"stddev":62655.54616372561,"sample":[]},"countysub":{"ckmeans5":[810700,396500,220400,117200],"ckmeans7":[85100,146900,230400,352800,569500,1041800],"ckmeans9":[1041800,569500,388200,274000,202500,142400,94600,42100],"stddev7":[298596.1133745799,236564.07558305323,174532.0377915266,112500,50467.96220847338,-11564.075583053243,-73596.11337457987],"stddev8":[422660.1889576331,298596.1133745799,174532.0377915266,50467.96220847338,-73596.11337457987,-197660.1889576331],"quantile5":[197900,131250,97550,73950],"quantile7":[239800,164300,123300,103200,82100,65900],"quantile9":[263400,190200,150800,121200,105900,88100,76200,60600],"quantile11":[285600,209200,166800,141100,119400,107100,92500,81100,71500,56900],"min":0,"max":1332000,"mean":146514.097,"median":112500,"stddev":124064.07558305324,"sample":[]},"place":{"ckmeans5":[1400900,731000,355500,142800],"ckmeans7":[56000,157300,306300,505200,792400,1400900],"ckmeans9":[1602300,1106500,731000,505200,338600,212500,130100,50000],"stddev7":[464267.63363365276,356395.0890891019,248522.54454455094,140650,32777.455455449075,-75095.08908910185,-182967.63363365276],"stddev8":[680012.7227227546,464267.63363365276,248522.54454455094,32777.455455449075,-182967.63363365276,-398712.7227227546],"quantile5":[270650,173650,108850,65300],"quantile7":[355500,223000,165800,115700,84000,41300],"quantile9":[414400,252600,203200,162500,119400,93000,70900,0],"quantile11":[463200,290500,225600,187800,160700,120800,100000,81700,59800,0],"min":0,"max":2000001,"mean":197117.098,"median":140650,"stddev":215745.08908910185,"sample":[]},"zcta":{"ckmeans5":[853600,514100,312500,169600],"ckmeans7":[141400,253600,369600,540900,808600,2000001],"ckmeans9":[2000001,853600,622300,462900,343800,253600,166800,67700],"stddev7":[522347.1967693345,430814.797846223,339282.3989231115,247750,156217.6010768885,64685.202153777005,-26847.196769334492],"stddev8":[705411.9946155575,522347.1967693345,339282.3989231115,156217.6010768885,-26847.196769334492,-209911.9946155575],"quantile5":[373400,281550,217700,139150],"quantile7":[429000,327000,273000,228700,178700,108600],"quantile9":[472000,357400,306500,266900,233300,194300,153600,100700],"quantile11":[504700,387000,331800,293400,264000,237300,205700,173000,125900,94200],"min":0,"max":2000001,"mean":276916.301,"median":247750,"stddev":183064.797846223,"sample":[]},"tract":{"ckmeans5":[1293800,646600,360600,181800],"ckmeans7":[139200,264000,418500,656900,1036400,1573500],"ckmeans9":[1724600,1208300,757800,544600,385300,280800,198400,111800],"stddev7":[593999.8880869956,469666.5920579971,345333.29602899856,221000,96666.70397100145,-27666.5920579971,-151999.88808699563],"stddev8":[842666.4801449927,593999.8880869956,345333.29602899856,96666.70397100145,-151999.88808699563,-400666.4801449927],"quantile5":[363050,249600,193800,131300],"quantile7":[446400,298100,237300,200000,164000,103400],"quantile9":[495800,340300,270800,231600,204100,172300,144400,87400],"quantile11":[578400,386300,307000,259900,229500,206100,182100,159000,123100,80000],"min":0,"max":2000001,"mean":280503.204,"median":221000,"stddev":248666.5920579971,"sample":[]},"bg":{"ckmeans5":[239200,141500,93600,42800],"ckmeans7":[32000,72900,103200,140100,197800,310300],"ckmeans9":[368100,247600,185700,143800,115900,91800,67200,28900],"stddev7":[177063.42579047626,150208.95052698418,123354.47526349209,96500,69645.52473650791,42791.04947301582,15936.574209523722],"stddev8":[230772.37631746047,177063.42579047626,123354.47526349209,69645.52473650791,15936.574209523722,-37772.37631746047],"quantile5":[141900,108900,85950,67250],"quantile7":[153700,122700,104500,88600,76600,59400],"quantile9":[161200,135300,117300,102500,90000,80300,69500,55500],"quantile11":[168400,146400,125500,113200,101100,90700,82400,75600,64300,48800],"min":0,"max":452900,"mean":104142.7,"median":96500,"stddev":53708.95052698418,"sample":[]}},"mfi":{"state":{"ckmeans5":[80778,68817,60809,49274],"ckmeans7":[49274,59410,65237,70720,77055,84232],"ckmeans9":[87085,81726,77055,70720,65237,59410,55049,49274],"stddev7":[83985.3261082081,77927.88407213874,71870.44203606938,65813,59755.55796393063,53698.11592786126,47640.67389179189],"stddev8":[96100.21018034685,83985.3261082081,71870.44203606938,59755.55796393063,47640.67389179189,35525.78981965315],"quantile5":[74826,68817,62247,57504],"quantile7":[80778,73194,68064,62717,59410,56110],"quantile9":[84232,74708,71546,67466,62817,60916,57573,55341],"quantile11":[85321,77055,73194,70720,67466,62817,61119,59410,57144,55049],"min":22976,"max":90089,"mean":66550.73076923077,"median":65813,"stddev":12114.884072138739,"sample":[]},"msa":{"ckmeans5":[78057,63254,52946,39920],"ckmeans7":[34135,47829,55747,63539,74118,93834],"ckmeans9":[93834,78057,69203,62204,56065,50145,42886,29371],"stddev7":[75849.11855039226,69655.74570026151,63462.372850130756,57269,51075.627149869244,44882.254299738495,38688.88144960774],"stddev8":[88235.86425065377,75849.11855039226,63462.372850130756,51075.627149869244,38688.88144960774,26302.135749346235],"quantile5":[66800,60012,54788,49384],"quantile7":[70037,63686,59161,55471,51842,47346],"quantile9":[72089,66067,61676,58670,55933,53263,50220,46043],"quantile11":[73765,67472,64076,60866,58424,56195,53884,51500,48944,44717],"min":12848,"max":123646,"mean":58257.03444564047,"median":57269,"stddev":12386.745700261506,"sample":[]},"tract":{"ckmeans5":[171083,108618,72904,45063],"ckmeans7":[37450,60938,83750,110868,153523,211974],"ckmeans9":[222569,171083,130574,103426,82652,63913,45313,20859],"stddev7":[134968.76107967907,112414.84071978607,89860.92035989303,67307,44753.07964010697,22199.159280213942,-354.7610796790832],"stddev8":[180076.60179946513,134968.76107967907,89860.92035989303,44753.07964010697,-354.7610796790832,-45462.60179946515],"quantile5":[99629.5,76035.5,59337.5,45554.5],"quantile7":[114688,88672,73515,61333,51985,40449],"quantile9":[123800,95820,81750,71667,62679,55110,47642,36875],"quantile11":[137857,103500,90107,79013,71250,63417,57128,51026,44019,34353],"min":0,"max":250001,"mean":77450.847,"median":67307,"stddev":45107.84071978606,"sample":[]},"cbsa":{"ckmeans5":[77398,65883,56670,45882],"ckmeans7":[45882,52781,59149,65883,74612,84080],"ckmeans9":[84080,74612,68721,63321,59149,52781,45882,34368],"stddev7":[77446.01770092038,71840.34513394692,66234.67256697346,60629,55023.32743302654,49417.65486605308,43811.98229907963],"stddev8":[88657.3628348673,77446.01770092038,66234.67256697346,55023.32743302654,43811.98229907963,32600.637165132714],"quantile5":[69587,62635,58119,54156],"quantile7":[71230,66277,61597,59583,56110,53079],"quantile9":[74612,68750,64543,61263,60005,56898,54924,50559],"quantile11":[75443,70228,66812,63751,61194,60046,57566,55653,53899,49271],"min":18921,"max":97741,"mean":61260.05917159763,"median":60629,"stddev":11211.345133946914,"sample":[]},"county":{"ckmeans5":[91077,72000,58116,47636],"ckmeans7":[44257,52120,59659,68485,80067,94850],"ckmeans9":[108637,91077,78500,68485,60544,53880,47237,40055],"stddev7":[77545.53998956928,70302.69332637952,63059.84666318976,55817,48574.15333681024,41331.306673620486,34088.460010430725],"stddev8":[92031.23331594879,77545.53998956928,63059.84666318976,48574.15333681024,34088.460010430725,19602.76668405121],"quantile5":[66222,58567.5,52448,46158.5],"quantile7":[70498,62441,57574,53348,48929,44079],"quantile9":[75179,65239,60900,57046,54095,50407,46938,42668],"quantile11":[78500,67188,63125,59926,56838,54478,51345,48706,45597,41909],"min":27021,"max":128504,"mean":57762.078,"median":55817,"stddev":14485.693326379516,"sample":[]},"place":{"ckmeans5":[208125,90482,58578,24028],"ckmeans7":[18819,46563,66737,90139,121250,208125],"ckmeans9":[208125,124693,97328,79076,63438,49821,36964,17143],"stddev7":[107073.14058120656,89969.59372080438,72866.04686040219,55762.5,38658.95313959781,21555.406279195624,4451.859418793436],"stddev8":[141280.23430201094,107073.14058120656,72866.04686040219,38658.95313959781,4451.859418793436,-29755.23430201094],"quantile5":[83535.5,63009,50220,34705],"quantile7":[91083,73036,60909,51667,42093,25625],"quantile9":[98393,80263,68875,59667,52261,45625,37031,0],"quantile11":[101675,85273,73750,65833,59219,53051,47647,41250,32727,0],"min":0,"max":250001,"mean":57615.39,"median":55762.5,"stddev":34207.093720804376,"sample":[]},"countysub":{"ckmeans5":[149884,86638,57326,26207],"ckmeans7":[21618,44750,58744,77255,104904,169033],"ckmeans9":[203047,133713,97349,74781,59609,48542,37292,16607],"stddev7":[92499.58406157818,79075.05604105213,65650.52802052606,52226,38801.471979473936,25376.943958947875,11952.415938421815],"stddev8":[119348.6401026303,92499.58406157818,65650.52802052606,38801.471979473936,11952.415938421815,-14896.640102630307],"quantile5":[70850,56423.5,48836,41293],"quantile7":[79291,63750,55179,49828,44662,38611],"quantile9":[84250,68367,60291,54728,50313,46275,42083,36250],"quantile11":[88333,73073,64442,58578,54085,50672,47364,44125,40667,34375],"min":0,"max":250001,"mean":56848.729,"median":52226,"stddev":26849.056041052125,"sample":[]},"zcta":{"ckmeans5":[144451,103279,73320,38365],"ckmeans7":[13042,41617,70482,92589,120268,161814],"ckmeans9":[181330,144451,117885,95938,79375,62479,38365,13042],"stddev7":[137709.2828902877,117348.35526019179,96987.42763009589,76626.5,56265.572369904105,35904.64473980821,15543.717109712314],"stddev8":[178431.13815047947,137709.2828902877,96987.42763009589,56265.572369904105,15543.717109712314,-25178.13815047947],"quantile5":[102973.5,84858,67769,38765],"quantile7":[112898,93924,82231,70707,55391,22471],"quantile9":[121081,100120,90378,81250,72417,61207,45638,19588],"quantile11":[126641,105714,94866,87393,80417,73438,64330,53738,33713,17797],"min":0,"max":245197,"mean":74899.1,"median":76626.5,"stddev":40721.85526019179,"sample":[]},"bg":{"ckmeans5":[13,10,7,4],"ckmeans7":[3,5,7,9,11,13],"ckmeans9":[14,13,12,11,9,7,5,3],"stddev7":[13.546693311223912,11.531128874149275,9.515564437074637,7.5,5.484435562925363,3.4688711258507254,1.4533066887760882],"stddev8":[17.577822185373186,13.546693311223912,9.515564437074637,5.484435562925363,1.4533066887760882,-2.5778221853731864],"quantile5":[12,9,6,3],"quantile7":[13,11,9,6,4,3],"quantile9":[13,11,10,8,7,5,4,2],"quantile11":[13,12,11,9,8,7,6,4,3,2],"min":1,"max":0,"mean":7.5,"median":7.5,"stddev":4.031128874149275,"sample":[]}},"pci":{"msa":{"ckmeans5":[34738,27410,22750,17160],"ckmeans7":[14689,20191,23718,27410,32442,43382],"ckmeans9":[43382,33925,29423,26384,23952,21598,18814,13701],"stddev7":[31451.724717915193,28873.816478610126,26295.908239305063,23718,21140.091760694937,18562.183521389874,15984.275282084807],"stddev8":[36607.541196525315,31451.724717915193,26295.908239305063,21140.091760694937,15984.275282084807,10828.458803474681],"quantile5":[27612,24910,22726,20559],"quantile7":[29148,26265,24567,23020,21517,19694],"quantile9":[30195,27246,25574,24339,23144,21983,20844,19214],"quantile11":[30732,27895,26492,25216,24253,23291,22414,21365,20408,18717],"min":7242,"max":51148,"mean":24252.386437029065,"median":23718,"stddev":5155.816478610128,"sample":[]},"tract":{"ckmeans5":[55661,38461,26911,17307],"ckmeans7":[10776,19248,26445,34715,44406,59879],"ckmeans9":[62061,48174,39171,32071,26159,20777,15469,8118],"stddev7":[42823.22170069086,36553.81446712724,30284.40723356362,24015,17745.59276643638,11476.185532872762,5206.778299309142],"stddev8":[55362.03616781809,42823.22170069086,30284.40723356362,17745.59276643638,5206.778299309142,-7332.036167818096],"quantile5":[34581.5,27000.5,21760.5,16830],"quantile7":[38461,31071,25991,22523,18791,15222],"quantile9":[41650,33529,29148,25734,22812,20110,17401,14156],"quantile11":[43832,35590,31592,28226,25386,22996,20821,18521,16282,13204],"min":0,"max":86426,"mean":26397.469,"median":24015,"stddev":12538.814467127238,"sample":[]},"county":{"ckmeans5":[43880,32021,25348,20439],"ckmeans7":[18533,22093,25389,29362,34742,45500],"ckmeans9":[45500,36809,32271,28460,25303,22421,19660,16242],"stddev7":[32275.865111800013,29205.91007453334,26135.95503726667,23066,19996.04496273333,16926.08992546666,13856.134888199986],"stddev8":[38415.775186333354,32275.865111800013,26135.95503726667,19996.04496273333,13856.134888199986,7716.224813666644],"quantile5":[27813,24264,21767.5,19507],"quantile7":[29821,26005,23981,22134,20534,18619],"quantile9":[31056,27317,25176,23718,22368,21101,19726,18082],"quantile11":[32724,28209,26227,24669,23630,22547,21385,20353,19194,17746],"min":8292,"max":60236,"mean":24105.762,"median":23066,"stddev":6139.910074533343,"sample":[]},"cbsa":{"ckmeans5":[34376,26892,22864,18083],"ckmeans7":[18083,22383,24656,26892,29403,34376],"ckmeans9":[40128,34376,29403,26892,24656,22383,18083,12367],"stddev7":[32436.95541828455,30105.303612189702,27773.65180609485,25442,23110.34819390515,20778.696387810298,18447.04458171545],"stddev8":[37100.25903047425,32436.95541828455,27773.65180609485,23110.34819390515,18447.04458171545,13783.740969525748],"quantile5":[29131,26469,24667,23232],"quantile7":[29981,28103,26063,24993,23758,21899],"quantile9":[30658,28611,27560,25871,25106,24139,23390,21059],"quantile11":[31233,29490,28294,27206,25802,25112,24350,23674,22864,20805],"min":9238,"max":40565,"mean":25828.721893491125,"median":25442,"stddev":4663.3036121897,"sample":[]},"state":{"ckmeans5":[47675,34152,29291,21057],"ckmeans7":[21057,25737,29291,31762,36582,47675],"ckmeans9":[47675,36582,33236,31118,29291,26381,24604,21057],"stddev7":[35686.102263118984,33013.901508745985,30341.700754372992,27669.5,24997.299245627008,22325.09849125401,19652.89773688102],"stddev8":[41030.50377186497,35686.102263118984,30341.700754372992,24997.299245627008,19652.89773688102,14308.49622813503],"quantile5":[32157,29291,26607,24981],"quantile7":[33413,30554,27950,26829,25737,24091],"quantile9":[34362,32035,29894,27882,26953,26259,25032,24012],"quantile11":[36582,32217,30554,29822,27882,26953,26381,25737,24686,23450],"min":11394,"max":47675,"mean":28531.884615384617,"median":27669.5,"stddev":5344.4015087459875,"sample":[]},"place":{"ckmeans5":[66415,37603,24656,13610],"ckmeans7":[9012,19240,28172,39979,60827,96767],"ckmeans9":[96767,60827,42350,32846,25929,19978,14055,5939],"stddev7":[45195.2502946707,37795.50019644713,30395.750098223565,22996,15596.249901776433,8196.499803552866,796.7497053292973],"stddev8":[59994.75049111783,45195.2502946707,30395.750098223565,15596.249901776433,796.7497053292973,-14002.750491117833],"quantile5":[33184.5,25612,20836.5,15613],"quantile7":[37603,29771,24917,21292,18159,13464],"quantile9":[40284,31900,27386,24454,21635,19199,16250,11782],"quantile11":[43612,34594,30387,26579,24094,21920,20004,17635,15045,10899],"min":0,"max":151037,"mean":25404.731,"median":22996,"stddev":14799.500196447134,"sample":[]},"countysub":{"ckmeans5":[75634,41761,28868,20032],"ckmeans7":[14473,21576,28754,37875,50700,75634],"ckmeans9":[90087,54923,40865,31564,25656,21281,16778,8585],"stddev7":[38605.467582990546,33264.8117219937,27924.15586099685,22583.5,17242.84413900315,11902.1882780063,6561.53241700945],"stddev8":[49286.779304984244,38605.467582990546,27924.15586099685,17242.84413900315,6561.53241700945,-4119.779304984248],"quantile5":[30475,24040.5,20978,18330],"quantile7":[33392,26546,23623,21457,19418,17074],"quantile9":[35432,28922,25399,23328,21705,20066,18611,16217],"quantile11":[37875,31564,26848,24772,23216,21930,20454,19277,18042,15567],"min":0,"max":105846,"mean":24826.74,"median":22583.5,"stddev":10681.3117219937,"sample":[]},"zcta":{"ckmeans5":[65686,43529,30990,17989],"ckmeans7":[16873,28679,37584,48061,65686,133400],"ckmeans9":[133400,80787,60935,47629,38658,31498,24310,14797],"stddev7":[56505.04452934518,48418.863019563454,40332.68150978173,32246.5,24160.318490218273,16074.136980436546,7987.955470654819],"stddev8":[72677.40754890864,56505.04452934518,40332.68150978173,24160.318490218273,7987.955470654819,-8184.407548908639],"quantile5":[42286,34999.5,29256.5,20762.5],"quantile7":[45956,38526,34277,30159,25217,14502],"quantile9":[48787,41050,36815,33867,30714,26896,21866,11443],"quantile11":[51084,43647,39109,35866,33593,31022,27988,24450,19580,9922],"min":0,"max":152769,"mean":32473.116,"median":32246.5,"stddev":16172.363019563454,"sample":[]},"bg":{"ckmeans5":[35610,26108,20159,14255],"ckmeans7":[12620,17406,21174,25491,31344,41507],"ckmeans9":[45753,35610,29115,24545,20773,17362,13241,6111],"stddev7":[30760.92958745656,27277.286391637706,23793.643195818855,20310,16826.356804181145,13342.713608362294,9859.070412543439],"stddev8":[37728.21597909427,30760.92958745656,23793.643195818855,16826.356804181145,9859.070412543439,2891.784020905732],"quantile5":[25782.5,21857.5,18846.5,15980.5],"quantile7":[27802,23698,21461,19273,17272,14926],"quantile9":[28759,25070,22829,21151,19540,18045,16247,13834],"quantile11":[30054,26343,23900,22398,21027,19684,18362,17082,15688,12932],"min":0,"max":56743,"mean":21082.97,"median":20310,"stddev":6967.286391637707,"sample":[]}},"myb":{"cbsa":{"ckmeans5":[1988,1981,1975,1967],"ckmeans7":[1962,1968,1974,1978,1983,1988],"ckmeans9":[1989,1984,1980,1977,1974,1969,1964,1960],"stddev7":[1990.2947440302503,1985.8631626868334,1981.4315813434168,1977,1972.5684186565832,1968.1368373131666,1963.7052559697497],"stddev8":[1999.1579067170837,1990.2947440302503,1981.4315813434168,1972.5684186565832,1963.7052559697497,1954.8420932829163],"quantile5":[1984,1979,1975,1967],"quantile7":[1985,1981,1978,1976,1972,1964],"quantile9":[1986,1983,1980,1978,1976,1974,1970,1962],"quantile11":[1986,1984,1981,1980,1978,1976,1975,1972,1966,1962],"min":1955,"max":1995,"mean":1976.0236686390533,"median":1977,"stddev":8.863162686833453,"sample":[]},"county":{"ckmeans5":[1986,1977,1965,1939],"ckmeans7":[1939,1958,1968,1976,1982,1989],"ckmeans9":[1990,1984,1979,1974,1968,1961,1953,1939],"stddev7":[2073.279558110594,2041.5197054070625,2009.7598527035314,1978,1946.2401472964686,1914.4802945929375,1882.7204418894062],"stddev8":[2136.7992635176565,2073.279558110594,2009.7598527035314,1946.2401472964686,1882.7204418894062,1819.2007364823437],"quantile5":[1986,1980,1975,1966],"quantile7":[1988,1983,1980,1976,1972,1962],"quantile9":[1989,1985,1982,1979,1977,1973,1968,1959],"quantile11":[1991,1986,1984,1981,1979,1977,1974,1971,1965,1958],"min":0,"max":2002,"mean":1974.205,"median":1978,"stddev":63.51970540706254,"sample":[]},"tract":{"ckmeans5":[1989,1971,1952,1939],"ckmeans7":[1939,1949,1962,1973,1984,1995],"ckmeans9":[1998,1990,1982,1973,1964,1955,1946,1939],"stddev7":[2449.5257939432445,2292.1838626288295,2134.841931314415,1977.5,1820.1580686855852,1662.8161373711705,1505.4742060567555],"stddev8":[2764.209656572074,2449.5257939432445,2134.841931314415,1820.1580686855852,1505.4742060567555,1190.790343427926],"quantile5":[1990,1981.5,1970,1955],"quantile7":[1993,1986,1980,1973,1961,1948],"quantile9":[1995,1989,1984,1980,1974,1965,1956,1942],"quantile11":[1997,1991,1987,1983,1979,1975,1967,1960,1953,1939],"min":0,"max":2006,"mean":1922.801,"median":1977.5,"stddev":314.68386262882956,"sample":[]},"state":{"ckmeans5":[1984,1978,1971,1964],"ckmeans7":[1956,1964,1971,1975,1980,1986],"ckmeans9":[1988,1984,1980,1977,1974,1971,1964,1956],"stddev7":[1989.4966569438443,1985.164437962563,1980.8322189812814,1976.5,1972.1677810187186,1967.835562037437,1963.5033430561557],"stddev8":[1998.1610949064072,1989.4966569438443,1980.8322189812814,1972.1677810187186,1963.5033430561557,1954.8389050935928],"quantile5":[1983,1978,1975,1969],"quantile7":[1984,1982,1978,1975,1972,1967],"quantile9":[1985,1982,1980,1978,1976,1973,1971,1964],"quantile11":[1986,1983,1982,1980,1978,1976,1974,1972,1967,1961],"min":1951,"max":1993,"mean":1975.6538461538462,"median":1976.5,"stddev":8.664437962562863,"sample":[]},"msa":{"ckmeans5":[1985,1978,1970,1962],"ckmeans7":[1961,1968,1974,1979,1984,1989],"ckmeans9":[1989,1984,1980,1976,1971,1966,1961,1954],"stddev7":[1990.4880194037883,1985.6586796025256,1980.8293398012627,1976,1971.1706601987373,1966.3413203974744,1961.5119805962117],"stddev8":[2000.1466990063138,1990.4880194037883,1980.8293398012627,1971.1706601987373,1961.5119805962117,1951.8533009936862],"quantile5":[1984,1979,1974,1967],"quantile7":[1986,1981,1978,1975,1971,1964],"quantile9":[1987,1983,1980,1978,1975,1972,1968,1962],"quantile11":[1987,1984,1982,1980,1977,1975,1973,1971,1966,1961],"min":1941,"max":2002,"mean":1975.3875134553284,"median":1976,"stddev":9.658679602525565,"sample":[]},"place":{"ckmeans5":[1986,1972,1954,1939],"ckmeans7":[1939,1949,1962,1973,1982,1991],"ckmeans9":[1996,1988,1982,1975,1967,1958,1947,1939],"stddev7":[2467.88915215169,2304.759434767793,2141.6297173838966,1978.5,1815.3702826161034,1652.2405652322068,1489.1108478483102],"stddev8":[2794.148586919483,2467.88915215169,2141.6297173838966,1815.3702826161034,1489.1108478483102,1162.851413080517],"quantile5":[1988,1982,1975,1959],"quantile7":[1990,1985,1981,1976,1968,1955],"quantile9":[1992,1987,1984,1980,1977,1971,1963,1950],"quantile11":[1993,1988,1985,1983,1980,1977,1973,1967,1958,1945],"min":0,"max":2005,"mean":1920.185,"median":1978.5,"stddev":326.25943476779327,"sample":[]},"countysub":{"ckmeans5":[1988,1978,1964,1939],"ckmeans7":[1939,1952,1966,1976,1983,1991],"ckmeans9":[1996,1989,1984,1979,1973,1964,1951,1939],"stddev7":[2229.1718382572844,2146.447892171523,2063.7239460857613,1981,1898.2760539142384,1815.552107828477,1732.8281617427156],"stddev8":[2394.6197304288075,2229.1718382572844,2063.7239460857613,1898.2760539142384,1732.8281617427156,1567.3802695711925],"quantile5":[1988.5,1983,1978.5,1972],"quantile7":[1991,1986,1983,1979,1975,1968],"quantile9":[1992,1988,1985,1982,1980,1977,1973,1965],"quantile11":[1993,1989,1986,1984,1982,1980,1978,1975,1971,1961],"min":0,"max":2004,"mean":1965.676,"median":1981,"stddev":165.447892171523,"sample":[]},"zcta":{"ckmeans5":[1978,1965,1950,1939],"ckmeans7":[1939,1947,1958,1968,1977,1986],"ckmeans9":[1989,1981,1975,1969,1962,1954,1945,1939],"stddev7":[2393.737729620576,2252.4918197470506,2111.2459098735253,1970,1828.7540901264747,1687.5081802529496,1546.2622703794243],"stddev8":[2676.229549367626,2393.737729620576,2111.2459098735253,1828.7540901264747,1546.2622703794243,1263.770450632374],"quantile5":[1981,1974,1966,1951],"quantile7":[1982,1978,1973,1967,1959,1944],"quantile9":[1983,1980,1976,1973,1968,1962,1954,1939],"quantile11":[1984,1981,1978,1975,1972,1968,1964,1957,1949,1939],"min":0,"max":2006,"mean":1926.076,"median":1970,"stddev":282.49181974705044,"sample":[]},"bg":{"ckmeans5":[1988,1978,1964,1939],"ckmeans7":[1939,1955,1967,1976,1983,1991],"ckmeans9":[1996,1989,1983,1977,1970,1962,1952,1939],"stddev7":[2169.251456434603,2106.500970956402,2043.750485478201,1981,1918.249514521799,1855.4990290435978,1792.7485435653969],"stddev8":[2294.7524273910053,2169.251456434603,2043.750485478201,1918.249514521799,1792.7485435653969,1667.2475726089947],"quantile5":[1989,1984,1978,1971],"quantile7":[1991,1987,1983,1979,1975,1966],"quantile9":[1992,1988,1986,1983,1979,1976,1972,1964],"quantile11":[1993,1990,1987,1985,1982,1980,1977,1974,1970,1961],"min":0,"max":2004,"mean":1971.483,"median":1981,"stddev":125.50097095640207,"sample":[]}},"pop":{"cbsa":{"ckmeans5":[18388091,5315720,2037541,791252],"ckmeans7":[791252,2037541,5315720,8055793,18388091,23516086],"ckmeans9":[23516086,18388091,8055793,5315720,2906589,1809570,1004766,467228],"stddev7":[4751281.166974806,3345321.1113165375,1939361.0556582687,533401,-872559.0556582687,-2278519.1113165375,-3684479.166974806],"stddev8":[7563201.278291344,4751281.166974806,1939361.0556582687,-872559.0556582687,-3684479.166974806,-6496399.278291344],"quantile5":[1621491,709606,399112,208649],"quantile7":[2390713,1132757,674963,417763,248351,165505],"quantile9":[2906589,1466935,936507,648793,443312,291772,218226,134434],"quantile11":[3284952,2037541,1172306,851337,628286,467228,325875,242553,195826,127072],"min":36723,"max":23516086,"mean":1440027.5680473372,"median":533401,"stddev":2811920.1113165375,"sample":[]},"tract":{"ckmeans5":[8546,5832,4111,2537],"ckmeans7":[1820,3040,4182,5390,6830,9183],"ckmeans9":[10887,8373,6575,5334,4316,3386,2513,1355],"stddev7":[6965.391857715,5976.094571809999,4986.797285905,3997.5,3008.2027140950004,2018.9054281900003,1029.6081422850002],"stddev8":[8943.986429524999,6965.391857715,4986.797285905,3008.2027140950004,1029.6081422850002,-948.986429524999],"quantile5":[5655.5,4556.5,3503,2568],"quantile7":[6126,5081,4408,3631,2993,2219],"quantile9":[6471,5447,4872,4332,3708,3204,2701,2060],"quantile11":[6901,5807,5194,4725,4255,3762,3347,2949,2442,1921],"min":0,"max":14528,"mean":4206.102,"median":3997.5,"stddev":1978.5945718099997,"sample":[]},"state":{"ckmeans5":[38421464,19645772,8256630,3583073],"ckmeans7":[2798636,5278906,8904413,19645772,26538614,38421464],"ckmeans9":[38421464,26538614,19645772,11575977,8256630,5742117,4397353,2798636],"stddev7":[14556441.02890336,11093725.019268908,7631009.009634454,4168293,705576.9903655467,-2757139.0192689067,-6219855.02890336],"stddev8":[21481873.048172265,14556441.02890336,7631009.009634454,705576.9903655467,-6219855.02890336,-13145287.048172265],"quantile5":[8904413,5419171,2988081,1329100],"quantile7":[10006693,6641928,4830620,3583073,1869365,1014699],"quantile9":[12779559,8256630,6045448,4777576,3593222,2892987,1406299,843190],"quantile11":[12873761,9845333,6641928,5930538,4777576,3593222,2903379,1869365,1324201,733375],"min":579679,"max":38421464,"mean":6155732.576923077,"median":4168293,"stddev":6925432.019268907,"sample":[]},"county":{"ckmeans5":[10038388,3116069,1302884,363453],"ckmeans7":[145046,524886,1229039,2298032,4018143,10038388],"ckmeans9":[10038388,5236393,3116069,1843152,1229039,702898,363453,116648],"stddev7":[732322.5805270158,497084.05368467723,261845.52684233862,26607,-208631.52684233862,-443870.05368467723,-679108.5805270158],"stddev8":[1202799.634211693,732322.5805270158,261845.52684233862,-208631.52684233862,-679108.5805270158,-1149585.634211693],"quantile5":[115807.5,37454.5,18916,9362.5],"quantile7":[183753,67081,34332,21110,13502,7315],"quantile9":[248966,101960,49146,32835,22001,15807,10300,5939],"quantile11":[300870,136520,72124,43382,32358,22648,17002,12936,8769,5245],"min":85,"max":10038388,"mean":133616.608,"median":26607,"stddev":470477.05368467723,"sample":[]},"msa":{"ckmeans5":[19979950,9534008,4296416,1083156],"ckmeans7":[400523,1570006,3223096,5535837,9534008,19979950],"ckmeans9":[19979950,13154457,9534008,5535837,3223096,1606424,703744,242731],"stddev7":[1708633.2321035706,1164469.1547357137,620305.0773678569,76141,-468023.07736785687,-1012187.1547357137,-1556351.2321035706],"stddev8":[2796961.3868392846,1708633.2321035706,620305.0773678569,-468023.07736785687,-1556351.2321035706,-2644679.3868392846],"quantile5":[256989,105244,55196,36863],"quantile7":[403340,155917,96169,60791,43301,32534],"quantile9":[527367,214766,135034,92464,62992,47250,38339,28711],"quantile11":[638884,279748,164716,121112,87895,64974,51213,42154,35932,27012],"min":13117,"max":19979950,"mean":324091.0925726588,"median":76141,"stddev":1088328.1547357137,"sample":[]},"place":{"ckmeans5":[647484,299107,83476,19035],"ckmeans7":[5082,19035,45380,124795,299107,647484],"ckmeans9":[647484,299107,200614,124795,71549,38722,17162,4834],"stddev7":[43125.25031717116,29031.50021144744,14937.75010572372,844,-13249.75010572372,-27343.50021144744,-41437.25031717116],"stddev8":[71312.7505286186,43125.25031717116,14937.75010572372,-13249.75010572372,-41437.25031717116,-69624.7505286186],"quantile5":[4526.5,1549.5,522.5,153],"quantile7":[7320,2630,1251,582,258,92],"quantile9":[8943,3888,2085,1141,616,372,169,66],"quantile11":[11043,5364,2843,1842,1098,661,436,238,135,51],"min":0,"max":647484,"mean":5864.843,"median":844,"stddev":28187.50021144744,"sample":[]},"zcta":{"ckmeans5":[55706,34616,20613,8483],"ckmeans7":[5067,12368,21752,33200,48168,73099],"ckmeans9":[73099,48168,35840,27526,20613,14017,8483,3680],"stddev7":[30049.313220919474,22742.875480612984,15436.437740306492,8130,823.5622596935082,-6482.875480612984,-13789.313220919474],"stddev8":[44662.18870153246,30049.313220919474,15436.437740306492,823.5622596935082,-13789.313220919474,-28402.18870153246],"quantile5":[24915.5,12210.5,5199,1538],"quantile7":[29095,17915,11029,6149,2803,950],"quantile9":[32294,23232,15818,10403,6469,3717,1868,708],"quantile11":[35379,26259,18397,14313,9761,6827,4427,2548,1362,551],"min":0,"max":104645,"mean":13507.39,"median":8130,"stddev":14612.875480612984,"sample":[]},"countysub":{"ckmeans5":[647484,380195,166303,44587],"ckmeans7":[14777,47903,99705,199571,380195,647484],"ckmeans9":[647484,380195,269074,166303,99705,56643,24527,8487],"stddev7":[78390.13358125919,53649.42238750612,28908.71119375306,4168,-20572.71119375306,-45313.42238750612,-70054.13358125919],"stddev8":[127871.5559687653,78390.13358125919,28908.71119375306,-20572.71119375306,-70054.13358125919,-119535.5559687653],"quantile5":[15215.5,5855,2746.5,964.5],"quantile7":[22396,9667,5246,3221,1581,596],"quantile9":[27648,13392,8057,4995,3393,2040,1084,475],"quantile11":[32972,17272,10222,7063,4861,3551,2357,1512,856,398],"min":0,"max":649654,"mean":16161.047,"median":4168,"stddev":49481.42238750612,"sample":[]},"bg":{"ckmeans5":[5086,2566,1699,1048],"ckmeans7":[853,1285,1808,2509,3871,7232],"ckmeans9":[7232,3871,2724,2129,1699,1329,1009,704],"stddev7":[2342.9562129270353,1960.804141951357,1578.6520709756785,1196.5,814.3479290243215,432.1958580486431,50.04378707296473],"stddev8":[3107.2603548783923,2342.9562129270353,1578.6520709756785,814.3479290243215,50.04378707296473,-714.2603548783923],"quantile5":[1826,1365.5,1062,794],"quantile7":[2046,1572,1320,1098,909,715],"quantile9":[2207,1747,1481,1293,1117,969,824,655],"quantile11":[2292,1912,1604,1427,1276,1134,1018,901,766,617],"min":0,"max":8167,"mean":1360.186,"median":1196.5,"stddev":764.3041419513569,"sample":[]}}}};

var datatree = {
    "acs1115": {


        "mhi": {
            "title": "Median Household Income",
            "table": "b19013",
            "section": "Income",
            "expression": ["b19013001"],
            "type": "currency",
            "minval": "1",
            "mininc": "1",
            "usezeroasnull": "yes",
            "favtable": "Median Household Income",
            "favstyle": ["ckmeans", "7", "mh1"],
            "bg": "yes"
        },

        "mhv": {
            "title": "Median Home Value",
            "section": "Housing",
            "table": "b25077",
            "expression": ["b25077001"],
            "type": "currency",
            "minval": "1",
            "mininc": "1",
            "usezeroasnull": "yes",
            "favtable": "Median Home Value",
            "favstyle": ["ckmeans", "7", "mh2"],
            "bg": "yes"
        },

        "mfi": {
            "title": "Median Family Income",
            "section": "Income",
            "table": "b19113",
            "expression": ["b19113001"],
            "type": "currency",
            "minval": "1",
            "mininc": "1",
            "usezeroasnull": "yes",
            "favtable": "Median Family Income",
            "favstyle": ["ckmeans", "7", "mh3"],
            "bg": "yes"
        },

        "pci": {
            "title": "Per Capita Income",
            "section": "Income",
            "table": "b19301",
            "expression": ["b19301001"],
            "type": "currency",
            "minval": "1",
            "mininc": "1",
            "usezeroasnull": "yes",
            "favtable": "Per Capita Income",
            "favstyle": ["ckmeans", "7", "mh4"],
            "bg": "yes"
        },

        "myb": {
            "title": "Median Year Housing Unit Built",
            "section": "Housing",
            "table": "b25035",
            "expression": ["b25035001"],
            "type": "regular",
            "minval": "1939",
            "mininc": "1",
            "usezeroasnull": "yes",
            "favtable": "Median Year Built",
            "favstyle": ["ckmeans", "7", "mh5"],
            "bg": "yes"
        },

        "pop": {
            "title": "Total Population",
            "section": "Population",
            "table": "b01001",
            "expression": ["b01001001"],
            "type": "number",
            "minval": "0",
            "mininc": "1",
            "usezeroasnull": "no",
            "favtable": "Basic Population (total)",
            "favstyle": ["ckmeans", "7", "mh7"],
            "bg": "yes"
        }
        /*,

                "pcth": {
                    "title": "Percent Hispanic",
                    "section": "Race",
                    "table": "b03002",
                    "expression": ["b03002012", "/", "b03002001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": ".01",
                    "usezeroasnull": "no",
                    "favtable": "Race-Ethnicity (percent)",
                    "favstyle": ["ckmeans", "7", "mh6"],
                    "bg": "yes"
                },

                "pctw": {
                    "title": "Percent White",
                    "section": "Race",
                    "table": "b03002",
                    "expression": ["b03002003", "/", "b03002001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Race-Ethnicity (percent)",
                    "favstyle": ["ckmeans", "7", "mh8"],
                    "bg": "yes"
                },

                "pctb": {
                    "title": "Percent Black",
                    "section": "Race",
                    "table": "b03002",
                    "expression": ["b03002004", "/", "b03002001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Race-Ethnicity (percent)",
                    "favstyle": ["ckmeans", "7", "mh9"],
                    "bg": "yes"
                },

                "pctna": {
                    "title": "Percent Native American",
                    "section": "Race",
                    "table": "b03002",
                    "expression": ["b03002005", "/", "b03002001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Race-Ethnicity (percent)",
                    "favstyle": ["ckmeans", "7", "sh1"],
                    "bg": "yes"
                },

                "pctasian": {
                    "title": "Percent Asian",
                    "section": "Race",
                    "table": "b03002",
                    "expression": ["b03002006", "/", "b03002001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Race-Ethnicity (percent)",
                    "favstyle": ["ckmeans", "7", "sh2"],
                    "bg": "yes"
                },

                "pcthaw": {
                    "title": "Percent Hawaiian & PacIs",
                    "section": "Race",
                    "table": "b03002",
                    "expression": ["b03002007", "/", "b03002001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Race-Ethnicity (percent)",
                    "favstyle": ["ckmeans", "7", "sh4"],
                    "bg": "yes"
                },

                "pctmale": {
                    "title": "Percent Male",
                    "section": "Population",
                    "table": "b01001",
                    "expression": ["b01001002", "/", "b01001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Male & Female (percent)",
                    "favstyle": ["ckmeans", "7", "sh6"],
                    "bg": "yes"
                },

                "pctfemale": {
                    "title": "Percent Female",
                    "section": "Population",
                    "table": "b01001",
                    "expression": ["b01001026", "/", "b01001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Male & Female (percent)",
                    "favstyle": ["ckmeans", "7", "sh5"],
                    "bg": "yes"
                },

                "ageless10": {
                    "title": "Percent Age Less Than 10",
                    "section": "Age",
                    "table": "b01001",
                    "expression": ["(", "b01001003", "+", "b01001004", "+", "b01001027", "+", "b01001028", ")", "/", "b01001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Age Group (percent)",
                    "favstyle": ["ckmeans", "7", "mh1"],
                    "bg": "yes"
                },

                "ageless18": {
                    "title": "Percent Age Less Than 18",
                    "section": "Age",
                    "table": "b01001",
                    "expression": ["(", "b01001003", "+", "b01001004", "+", "b01001027", "+", "b01001028", "+", "b01001005", "+", "b01001006", "+", "b01001029", "+", "b01001030", ")", "/", "b01001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Age Group (percent)",
                    "favstyle": ["ckmeans", "7", "mh2"],
                    "bg": "yes"
                },

                "age18to24": {
                    "title": "Percent Age 18 to 24",
                    "section": "Age",
                    "table": "b01001",
                    "expression": ["(", "b01001007", "+", "b01001008", "+", "b01001009", "+", "b01001010", "+", "b01001031", "+", "b01001032", "+", "b01001033", "+", "b01001034", ")", "/", "b01001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Age Group (percent)",
                    "favstyle": ["ckmeans", "7", "mh3"],
                    "bg": "yes"
                },

                "age25to34": {
                    "title": "Percent Age 25 to 34",
                    "section": "Age",
                    "table": "b01001",
                    "expression": ["(", "b01001011", "+", "b01001012", "+", "b01001035", "+", "b01001036", ")", "/", "b01001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Age Group (percent)",
                    "favstyle": ["ckmeans", "7", "mh4"],
                    "bg": "yes"
                },

                "age35to44": {
                    "title": "Percent Age 35 to 44",
                    "section": "Age",
                    "table": "b01001",
                    "expression": ["(", "b01001013", "+", "b01001014", "+", "b01001037", "+", "b01001038", ")", "/", "b01001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Age Group (percent)",
                    "favstyle": ["ckmeans", "7", "mh5"],
                    "bg": "yes"
                },

                "age45to64": {
                    "title": "Percent Age 45 to 64",
                    "section": "Age",
                    "table": "b01001",
                    "expression": ["(", "b01001015", "+", "b01001016", "+", "b01001017", "+", "b01001018", "+", "b01001019", "+", "b01001039", "+", "b01001040", "+", "b01001041", "+", "b01001042", "+", "b01001043", ")", "/", "b01001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Age Group (percent)",
                    "favstyle": ["ckmeans", "7", "mh6"],
                    "bg": "yes"
                },

                "age65plus": {
                    "title": "Percent Age 65 Plus",
                    "section": "Age",
                    "table": "b01001",
                    "expression": ["(", "b01001020", "+", "b01001021", "+", "b01001022", "+", "b01001023", "+", "b01001024", "+", "b01001025", "+", "b01001044", "+", "b01001045", "+", "b01001046", "+", "b01001047", "+", "b01001048", "+", "b01001049", ")", "/", "b01001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Age Group (percent)",
                    "favstyle": ["ckmeans", "7", "mh7"],
                    "bg": "yes"
                },

                "medianage": {
                    "title": "Median Age",
                    "section": "Age",
                    "table": "b01002",
                    "expression": ["b01002001"],
                    "type": "number",
                    "minval": "1",
                    "mininc": "0.1",
                    "usezeroasnull": "yes",
                    "favtable": "Median Age",
                    "favstyle": ["ckmeans", "7", "mh8"],
                    "bg": "yes"
                },

                "households": {
                    "title": "Total Households",
                    "section": "Household",
                    "table": "b11001",
                    "expression": ["b11001001"],
                    "type": "number",
                    "minval": "0",
                    "mininc": "1",
                    "usezeroasnull": "no",
                    "favtable": "Household Type (total)",
                    "favstyle": ["ckmeans", "7", "mh9"],
                    "bg": "yes"
                },

                "familyhh": {
                    "title": "Percent Family Households",
                    "section": "Household",
                    "table": "b11001",
                    "expression": ["b11001002", "/", "b11001001"],
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Household Type (total)",
                    "favstyle": ["ckmeans", "7", "mh10"],
                    "bg": "yes"
                },

                "nonfamhh": {
                    "title": "Percent Non Family Households",
                    "section": "Household",
                    "table": "b11001",
                    "expression": ["b11001007", "/", "b11001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Household Type (total)",
                    "favstyle": ["ckmeans", "7", "mh11"],
                    "bg": "yes"
                },

                "housingun": {
                    "title": "Total Housing Units",
                    "section": "Housing",
                    "table": "b25002",
                    "expression": ["b25002001"],
                    "type": "number",
                    "minval": "0",
                    "mininc": "1",
                    "usezeroasnull": "no",
                    "favtable": "Housing Units (total)",
                    "favstyle": ["ckmeans", "7", "mh12"],
                    "bg": "yes"
                },

                "occhu": {
                    "title": "Percent Occupied Housing Units",
                    "section": "Housing",
                    "table": "b25002",
                    "expression": ["b25002002", "/", "b25002001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Occupancy (percent)",
                    "favstyle": ["ckmeans", "7", "sh1"],
                    "bg": "yes"
                },

                "vachu": {
                    "title": "Percent Vacant Housing Units",
                    "section": "Housing",
                    "table": "b25002",
                    "expression": ["b25002003", "/", "b25002001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Occupancy (percent)",
                    "favstyle": ["ckmeans", "7", "sh2"],
                    "bg": "yes"
                },

                "owned": {
                    "title": "Percent Owner Occupied Housing Units",
                    "section": "Housing",
                    "table": "b25003",
                    "expression": ["b25003002", "/", "b25003001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Tenure (percent)",
                    "favstyle": ["ckmeans", "7", "sh4"],
                    "bg": "yes"
                },

                "rented": {
                    "title": "Percent Renter Occupied Housing Units",
                    "section": "Housing",
                    "table": "b25003",
                    "expression": ["b25003003", "/", "b25003001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Tenure (percent)",
                    "favstyle": ["ckmeans", "7", "sh5"],
                    "bg": "yes"
                },

                "nohsdipl": {
                    "title": "Percent No High School Diploma",
                    "section": "Education",
                    "table": "b15003",
                    "expression": ["(", "b15003002", "+", "b15003003", "+", "b15003004", "+", "b15003005", "+", "b15003006", "+", "b15003007", "+", "b15003008", "+", "b15003009", "+", "b15003010", "+", "b15003011", "+", "b15003012", "+", "b15003013", "+", "b15003014", "+", "b15003015", "+", "b15003016", ")", "/", "b15003001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Educational Attainment (percent)",
                    "favstyle": ["ckmeans", "7", "sh6"],
                    "bg": "yes"
                },

                "hsgradsc": {
                    "title": "Percent High School Degree or Some College",
                    "section": "Education",
                    "table": "b15003",
                    "expression": ["(", "b15003017", "+", "b15003018", "+", "b15003019", "+", "b15003020", "+", "b15003021", ")", "/", "b15003001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Educational Attainment (percent)",
                    "favstyle": ["ckmeans", "7", "mh1"],
                    "bg": "yes"
                },

                "bachlhghr": {
                    "title": "Percent Bachelors Degree or Higher",
                    "section": "Education",
                    "table": "b15003",
                    "expression": ["(", "b15003022", "+", "b15003023", "+", "b15003024", "+", "b15003025", ")", "/", "b15003001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Educational Attainment (percent)",
                    "favstyle": ["ckmeans", "7", "mh2"],
                    "bg": "yes"
                },

                "medcrent": {
                    "title": "Median Contract Rent",
                    "section": "Rent",
                    "table": "b25058",
                    "expression": ["b25058001"],
                    "type": "currency",
                    "minval": "1",
                    "mininc": "1",
                    "usezeroasnull": "yes",
                    "favtable": "Median Contract Rent",
                    "favstyle": ["ckmeans", "7", "mh3"],
                    "bg": "yes"
                },

                "medgrent": {
                    "title": "Median Gross Rent",
                    "section": "Rent",
                    "table": "b25064",
                    "expression": ["b25064001"],
                    "type": "currency",
                    "minval": "1",
                    "mininc": "1",
                    "usezeroasnull": "yes",
                    "favtable": "Median Gross Rent",
                    "favstyle": ["ckmeans", "7", "mh4"],
                    "bg": "yes"
                },

                "citzbirth": {
                    "title": "Percent US Citizen by Birth",
                    "section": "Citizenship",
                    "table": "b05001",
                    "expression": ["(", "b05001002", "+", "b05001003", "+", "b05001004", ")", "/", "b05001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Citizenship (percent)",
                    "favstyle": ["ckmeans", "7", "mh5"],
                    "bg": "no"
                },

                "citznat": {
                    "title": "Percent US Citizen by Naturalization",
                    "section": "Citizenship",
                    "table": "b05001",
                    "expression": ["b05001005", "/", "b05001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Citizenship (percent)",
                    "favstyle": ["ckmeans", "7", "mh6"],
                    "bg": "no"
                },

                "notcitz": {
                    "title": "Percent Not a US Citizen",
                    "section": "Citizenship",
                    "table": "b05001",
                    "expression": ["b05001006", "/", "b05001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Citizenship (percent)",
                    "favstyle": ["ckmeans", "7", "mh7"],
                    "bg": "no"
                },

                "borninsor": {
                    "title": "Percent US Native, Born in State of Residence",
                    "section": "Birthplace",
                    "table": "b05002",
                    "expression": ["b05002003", "/", "b05002001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Birthplace (percent)",
                    "favstyle": ["ckmeans", "7", "mh8"],
                    "bg": "no"
                },

                "bornothst": {
                    "title": "Percent US Native, Born in Another State",
                    "section": "Birthplace",
                    "table": "b05002",
                    "expression": ["b05002004", "/", "b05002001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Birthplace (percent)",
                    "favstyle": ["ckmeans", "7", "mh9"],
                    "bg": "no"
                },

                "nativeb": {
                    "title": "Percent US Native",
                    "section": "Birthplace",
                    "table": "b05002",
                    "expression": ["b05002002", "/", "b05002001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Birthplace (percent)",
                    "favstyle": ["ckmeans", "7", "mh10"],
                    "bg": "no"
                },

                "foreignb": {
                    "title": "Percent Foreign Born",
                    "section": "Birthplace",
                    "table": "b05002",
                    "expression": ["b05002013", "/", "b05002001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Birthplace (percent)",
                    "favstyle": ["ckmeans", "7", "mh11"],
                    "bg": "no"
                },

                "samehouse": {
                    "title": "Percent Did Not Move",
                    "section": "Migration",
                    "table": "b07003",
                    "expression": ["b07003004", "/", "b07003001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Migration (percent)",
                    "favstyle": ["ckmeans", "7", "mh12"],
                    "bg": "no"
                },

                "samecnty": {
                    "title": "Percent Moved Within County",
                    "section": "Migration",
                    "table": "b07003",
                    "expression": ["b07003007", "/", "b07003001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Migration (percent)",
                    "favstyle": ["ckmeans", "7", "sh1"],
                    "bg": "no"
                },

                "samestate": {
                    "title": "Percent Moved from Different County Within State",
                    "section": "Migration",
                    "table": "b07003",
                    "expression": ["b07003010", "/", "b07003001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Migration (percent)",
                    "favstyle": ["ckmeans", "7", "sh2"],
                    "bg": "no"
                },

                "diffstate": {
                    "title": "Percent Moved from Different State",
                    "section": "Migration",
                    "table": "b07003",
                    "expression": ["b07003013", "/", "b07003001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Migration (percent)",
                    "favstyle": ["ckmeans", "7", "sh4"],
                    "bg": "no"
                },

                "frmabroad": {
                    "title": "Percent Moved From Abroad",
                    "section": "Migration",
                    "table": "b07003",
                    "expression": ["b07003016", "/", "b07003001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Migration (percent)",
                    "favstyle": ["ckmeans", "7", "sh5"],
                    "bg": "no"
                },

                "carall": {
                    "title": "Percent Drove a Car Truck or Van to Work",
                    "section": "Transportation",
                    "table": "b08006",
                    "expression": ["b08006002", "/", "b08006001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Transportation to Work (percent)",
                    "favstyle": ["ckmeans", "7", "sh6"],
                    "bg": "no"
                },

                "usedpt": {
                    "title": "Percent Used Public Transportation",
                    "section": "Transportation",
                    "table": "b08006",
                    "expression": ["b08006008", "/", "b08006001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Transportation to Work (percent)",
                    "favstyle": ["ckmeans", "7", "mh1"],
                    "bg": "no"
                },

                "bike": {
                    "title": "Percent Biked to Work",
                    "section": "Transportation",
                    "table": "b08006",
                    "expression": ["b08006014", "/", "b08006001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Transportation to Work (percent)",
                    "favstyle": ["ckmeans", "7", "mh2"],
                    "bg": "no"
                },

                "walked": {
                    "title": "Percent Walked to Work",
                    "section": "Transportation",
                    "table": "b08006",
                    "expression": ["b08006015", "/", "b08006001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Transportation to Work (percent)",
                    "favstyle": ["ckmeans", "7", "mh3"],
                    "bg": "no"
                },

                "home": {
                    "title": "Percent Worked at Home",
                    "section": "Transportation",
                    "table": "b08006",
                    "expression": ["b08006017", "/", "b08006001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Transportation to Work (percent)",
                    "favstyle": ["ckmeans", "7", "mh4"],
                    "bg": "no"
                },

                "avghhsize": {
                    "title": "Average Household Size",
                    "section": "Housing",
                    "table": "b25010",
                    "expression": ["b25010001"],
                    "type": "number",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "yes",
                    "favtable": "Average Household Size",
                    "favstyle": ["ckmeans", "7", "mh5"],
                    "bg": "yes"
                },

                "insured": {
                    "title": "Percent Insured",
                    "section": "Insurance",
                    "table": "b27001",
                    "expression": ["(", "b27001004", "+", "b27001007", "+", "b27001010", "+", "b27001013", "+", "b27001016", "+", "b27001019", "+", "b27001022", "+", "b27001025", "+", "b27001028", "+", "b27001032", "+", "b27001035", "+", "b27001038", "+", "b27001041", "+", "b27001044", "+", "b27001047", "+", "b27001050", "+", "b27001053", "+", "b27001056", ")", "/", "b27001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Insurance (percent)",
                    "favstyle": ["ckmeans", "7", "mh7"],
                    "bg": "no"
                },

                "uninsured": {
                    "title": "Percent No Insurance",
                    "section": "Insurance",
                    "table": "b27001",
                    "expression": ["(", "b27001005", "+", "b27001008", "+", "b27001011", "+", "b27001014", "+", "b27001017", "+", "b27001020", "+", "b27001023", "+", "b27001026", "+", "b27001029", "+", "b27001033", "+", "b27001036", "+", "b27001039", "+", "b27001042", "+", "b27001045", "+", "b27001048", "+", "b27001051", "+", "b27001054", "+", "b27001057", ")", "/", "b27001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Insurance (percent)",
                    "favstyle": ["ckmeans", "7", "mh8"],
                    "bg": "no"
                },

                "enrolled": {
                    "title": "Percent Enrolled in School",
                    "section": "Education",
                    "table": "b14001",
                    "expression": ["b14001002", "/", "b14001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Enrolled in School (percent)",
                    "favstyle": ["ckmeans", "7", "mh9"],
                    "bg": "no"
                },

                "k8": {
                    "title": "Percent of Enrolled in K-8",
                    "section": "Education",
                    "table": "b14001",
                    "expression": ["(", "b14001004", "+", "b14001005", "+", "b14001006", ")", "/", "b14001002"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Enrolled in School (percent)",
                    "favstyle": ["ckmeans", "7", "mh10"],
                    "bg": "no"
                },

                "enrhs": {
                    "title": "Percent of Enrolled in 9-12",
                    "section": "Education",
                    "table": "b14001",
                    "expression": ["b14001007", "/", "b14001002"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Enrolled in School (percent)",
                    "favstyle": ["ckmeans", "7", "mh11"],
                    "bg": "no"
                },

                "enrcollege": {
                    "title": "Percent of Enrolled in Colleges",
                    "section": "Education",
                    "table": "b14001",
                    "expression": ["(", "b14001008", "+", "b14001009", ")", "/", "b14001002"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Enrolled in School (percent)",
                    "favstyle": ["ckmeans", "7", "mh12"],
                    "bg": "no"
                },

                "notenrolled": {
                    "title": "Percent Not Enrolled in School",
                    "section": "Education",
                    "table": "b14001",
                    "expression": ["b14001010", "/", "b14001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Enrolled in School (percent)",
                    "favstyle": ["ckmeans", "7", "sh1"],
                    "bg": "no"
                },

                "inpoverty": {
                    "title": "Percent in Poverty",
                    "section": "Poverty",
                    "table": "c17002",
                    "expression": ["(", "c17002002", "+", "c17002003", ")", "/", "c17002001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Poverty (percent)",
                    "favstyle": ["ckmeans", "7", "sh2"],
                    "bg": "yes"
                },

                "inpov150": {
                    "title": "Percent Below 150% Poverty",
                    "section": "Poverty",
                    "table": "c17002",
                    "expression": ["(", "c17002002", "+", "c17002003", "+", "c17002004", "+", "c17002005", ")", "/", "c17002001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Poverty (percent)",
                    "favstyle": ["ckmeans", "7", "sh4"],
                    "bg": "yes"
                },

                "disabled": {
                    "title": "Percent Disabled",
                    "section": "Disability",
                    "table": "b18101",
                    "expression": ["(", "b18101004", "+", "b18101007", "+", "b18101010", "+", "b18101013", "+", "b18101016", "+", "b18101019", "+", "b18101023", "+", "b18101026", "+", "b18101029", "+", "b18101032", "+", "b18101035", "+", "b18101038", ")", "/", "b18101001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Disability (percent)",
                    "favstyle": ["ckmeans", "7", "sh5"],
                    "bg": "no"
                },

                "unemp": {
                    "title": "Percent Unemployed",
                    "section": "Employment",
                    "table": "b23025",
                    "expression": ["b23025005", "/", "b23025002"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Unemployment (percent)",
                    "favstyle": ["ckmeans", "7", "sh6"],
                    "bg": "yes"
                },

                "armedforces": {
                    "title": "Percent of Labor Force in Armed Forces",
                    "section": "Employment",
                    "table": "b23025",
                    "expression": ["b23025006", "/", "b23025002"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Unemployment (percent)",
                    "favstyle": ["ckmeans", "7", "mh1"],
                    "bg": "yes"
                },

                "realtaxes": {
                    "title": "Median Real Estate Taxes Paid",
                    "section": "Housing",
                    "table": "b25103",
                    "expression": ["b25103001"],
                    "type": "currency",
                    "minval": "1",
                    "mininc": "1",
                    "usezeroasnull": "yes",
                    "favtable": "",
                    "favstyle": ["ckmeans", "7", "mh2"],
                    "bg": "no"
                },

                "moc_wmc": {
                    "title": "Median Monthly Owner Costs (w Mortgage)",
                    "section": "Housing",
                    "table": "b25088",
                    "expression": ["b25088002"],
                    "type": "currency",
                    "minval": "1",
                    "mininc": "1",
                    "usezeroasnull": "yes",
                    "favtable": "",
                    "favstyle": ["ckmeans", "7", "mh3"],
                    "bg": "yes"
                },

                "moc_nmc": {
                    "title": "Median Monthly Owner Costs (no Mortgage)",
                    "section": "Housing",
                    "table": "b25088",
                    "expression": ["b25088003"],
                    "type": "currency",
                    "minval": "1",
                    "mininc": "1",
                    "usezeroasnull": "yes",
                    "favtable": "",
                    "favstyle": ["ckmeans", "7", "mh4"],
                    "bg": "yes"
                },

                "hhalone": {
                    "title": "Pct of Households w Householder Living Alone",
                    "section": "Household",
                    "table": "b11001",
                    "expression": ["b11001008", "/", "b11001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "",
                    "favstyle": ["ckmeans", "7", "mh5"],
                    "bg": "yes"
                },

                "hhnalone": {
                    "title": "Pct of Households w Householder Not Living Alone",
                    "section": "Household",
                    "table": "b11001",
                    "expression": ["b11001009", "/", "b11001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Household Type (total)",
                    "favstyle": ["ckmeans", "7", "mh6"],
                    "bg": "yes"
                },

                "mcfhh": {
                    "title": "Percent Married Couple Family Households",
                    "section": "Household",
                    "table": "b11001",
                    "expression": ["b11001003", "/", "b11001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Household Type (total)",
                    "favstyle": ["ckmeans", "7", "mh7"],
                    "bg": "yes"
                },

                "mhhnwphh": {
                    "title": "Percent Male Householder, No Wife Present Households",
                    "section": "Household",
                    "table": "b11001",
                    "expression": ["b11001005", "/", "b11001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Household Type (total)",
                    "favstyle": ["ckmeans", "7", "mh8"],
                    "bg": "yes"
                },

                "fhhnhphh": {
                    "title": "Percent Female Householder, No Husband Present Households",
                    "section": "Household",
                    "table": "b11001",
                    "expression": ["b11001006", "/", "b11001001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "Household Type (total)",
                    "favstyle": ["ckmeans", "7", "mh9"],
                    "bg": "yes"
                },

                "hhwchild": {
                    "title": "Percent Households w Children Under 18 Present",
                    "section": "Household",
                    "table": "b11005",
                    "expression": ["b11005002", "/", "b11005001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": "0.01",
                    "usezeroasnull": "no",
                    "favtable": "",
                    "favstyle": ["ckmeans", "7", "mh10"],
                    "bg": "yes"
                },
                "cbhm": {
                    "title": "Cost Burdened Households (with a Mortgage)",
                    "section": "Housing",
                    "table": "b25101",
                    "expression": ["(", "b25101006", "+", "b25101010", "+", "b25101014", "+", "b25101020", "+", "b25101022", ")", "/", "b25101002"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": ".01",
                    "usezeroasnull": "no",
                    "favtable": "Cost Burdened Households (with a Mortgage)",
                    "favstyle": ["ckmeans", "7", "mh10"],
                    "bg": "yes"
                },
                "elvw": {
                    "title": "Population 5 and Over That Speaks English Less Than Very Well",
                    "section": "Language",
                    "table": "b06007",
                    "expression": ["(", "b06007008", "+", "b06007005", ")", "/", "b06007001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": ".01",
                    "usezeroasnull": "no",
                    "favtable": "Place of Birth by Language Spoken at Home and Ability to Speak English",
                    "favstyle": ["ckmeans", "7", "mh10"],
                    "bg": "no"
                },
                "p5ss": {
                    "title": "Population 5 and Over That Speaks Spanish",
                    "section": "Language",
                    "table": "b06007",
                    "expression": ["b06007003", "/", "b06007001"],
                    "type": "percent",
                    "minval": "0",
                    "mininc": ".01",
                    "usezeroasnull": "no",
                    "favtable": "Place of Birth by Language Spoken at Home and Ability to Speak English",
                    "favstyle": ["ckmeans", "7", "mh10"],
                    "bg": "no"
                }
        */


    }
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

    let breaks_style = datatree.acs1115[current_dropdown_value].favstyle[0] + datatree.acs1115[current_dropdown_value].favstyle[1];
    let legend_breaks = computed_breaks.acs1115[current_dropdown_value].county[breaks_style];

    let color_style = datatree.acs1115[current_dropdown_value].favstyle[2] + '_' + datatree.acs1115[current_dropdown_value].favstyle[1];
    let colorscheme = colortree[color_style];

    let type = datatree.acs1115[current_dropdown_value].type;
    let default_color = '#fff';
    let title = datatree.acs1115[current_dropdown_value].title;

    let html_string = "<div class='legend-title-text'>" + title + "</div>"; // inner HTML to be inserted into legend

    for (let i = legend_breaks.length - 1; i > -1; i--) {
        html_string += '<div><span class="legend-box" style="background-color:' + colorscheme[i] +
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

// set up map
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
        // map.on('click', function (e) {
        //    var map_reference = this;
        //    createPopup(e, acs_data, current_dropdown_value, map_reference);
        //});
        map.setPaintProperty('county-fill', 'fill-opacity', 0.8); // make county-fill layer visible
        map.setPaintProperty('county-fill', 'fill-color', getMapStyle(current_dropdown_value, acs_data));
    });
}

function fetchCensusData(style_code) {
    // load census data
    return fetch('https://gis.dola.colorado.gov/capi/demog?limit=99999&db=acs1115&table=' + datatree.acs1115[style_code].table + '&sumlev=50').then(function (fetch_response) {
        return fetch_response.json();
    }).then(function (census_response) {
        return census_response.data;
    });
}

function getMapStyle(style_code, acs_data) {

    let expression = datatree.acs1115[style_code].expression;
    let default_color = "#fff"; // lowest break color
    let null_color = "#fff";
    let zero_color = "#fff";


    let breaks_style = datatree.acs1115[style_code].favstyle[0] + datatree.acs1115[style_code].favstyle[1];
    let color_style = datatree.acs1115[style_code].favstyle[2] + '_' + datatree.acs1115[style_code].favstyle[1];

    let array = computed_breaks.acs1115[style_code].county[breaks_style];
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

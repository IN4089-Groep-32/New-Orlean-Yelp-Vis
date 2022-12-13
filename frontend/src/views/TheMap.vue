<template>
    <div>
        <!-- <img class="mb-3" src="@/assets/GreyBox.svg" alt="Default Grey Box" /> -->
        <div ref="map" style="width:100%; height:100%"></div>
        <div ref="popup" class="ol-popup">
            <a href="#" ref="popupcloser" class="ol-popup-closer"></a>
            <div ref="popupcontent"></div>
        </div>
    </div>
</template>

<script>
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import Overlay from 'ol/Overlay';
// import { toLonLat } from 'ol/proj';
// import { toStringHDMS } from 'ol/coordinate';
import GeoJSON from 'ol/format/GeoJSON';
import CONSTANTS from '../constants';

export default {
    name: "TheMap",

    components: {},
    props: {},

    data() {
        return {
            geoJsonObj:
            {
                type: 'FeatureCollection',
                crs: {
                    'type': 'name',
                    'properties': {
                        'name': 'EPSG:3857',
                    },
                },
                features: [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-90.091533, 29.951065],
                        },
                        'properties': {
                            'name': 'a store',
                            'business_id': 'YNjyv0gfOr2g8lbmUpTnKg',
                        }
                    },
                ]
            },
            WarningMessageOpen: false,
            WarningMessageText: ""
        };
    },

    created() {
    },

    mounted() {
        this.fetch_geojson();
        // this.createMap();
    },

    methods: {
        fetch_geojson() {
            fetch(CONSTANTS.PRECOMPUTED_DATA.GEO + "/geo.json")
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.json();
                })
                .then(result => {
                    this.geoJsonObj = result;
                    this.createMap();
                })
                .catch(error => {
                    this.WarningMessageOpen = true;
                    this.WarningMessageText = `${CONSTANTS.ERROR_MESSAGE.GRID_GET} ${error}`;
                });
        },
        createMap() {
            const container = this.$refs.popup;
            const closer = this.$refs.popupcloser;
            const content = this.$refs.popupcontent;

            var overlay = new Overlay({
                element: container,
                autoPan: {
                    animation: { duration: 250 }
                }
            });
            // alert(this.geoJsonObj.features[1].geometry);
            closer.onclick = function () {
                overlay.setPosition(undefined);
                closer.blur();
                return false;
            };
            var map = new Map({
                target: this.$refs['map'],
                layers: [new TileLayer({ source: new OSM() })],
                view: new View({
                    zoom: 14,
                    center: fromLonLat([-90.091533, 29.951065]),
                    constrainResolution: true
                }),
                overlays: [overlay],
            });
            var style = new Style({
                image: new CircleStyle({
                    radius: 7,
                    stroke: new Stroke({ //边界样式
                        color: '#319FD3',
                        width: 3
                    }),
                    fill: new Fill({ //⽮量图层填充颜⾊，以及透明度
                        color: 'rgba(255, 0, 0, 0.6)'
                    }),
                }),
                fill: new Fill({ //⽮量图层填充颜⾊，以及透明度
                    color: 'rgba(255, 0, 0, 0.6)'
                }),
                stroke: new Stroke({ //边界样式
                    color: '#319FD3',
                    width: 5
                }),
            });
            const styleFunction = function () {
                return style;
            };
            var fromJsonFeatures = new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(this.geoJsonObj);

            var vectorSource = new VectorSource({
                features: fromJsonFeatures,
            });
            var vectorLayer = new VectorLayer({
                source: vectorSource,
                style: styleFunction,
            });
            map.addLayer(vectorLayer);
            map.on('click', function (evt) {
                if (map.forEachFeatureAtPixel(evt.pixel,
                    function (feat) {
                        return fromJsonFeatures.includes(feat);
                    })
                ) {
                    var name = ""
                    var business_id = ""
                    map.forEachFeatureAtPixel(evt.pixel, function (feat) {
                        name = feat.get('name');
                        business_id = feat.get('business_id');
                    });
                    const coordinate = evt.coordinate;
                    // const hdms = toStringHDMS(toLonLat(coordinate));

                    content.innerHTML = '<p>You choosed: </p><a href=/review/' + business_id + '/' + name + '>' + name + '</a > ';
                    overlay.setPosition(coordinate);
                }
            });
        },
    }
};
</script>

<style>
.ol-popup {
    position: absolute;
    background-color: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 280px;
}

.ol-popup:after,
.ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}

.ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
}

.ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
}

.ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
}

.ol-popup-closer:after {
    content: "✖";
}
</style>

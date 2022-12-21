<template>
    <div>
        <!-- <img class="mb-3" src="@/assets/GreyBox.svg" alt="Default Grey Box" /> -->
        <div>
            <b-form-checkbox v-model="hmTo" ref="hmToggle" name="hmToggle" value="show" unchecked-value="hidden"
                @change="toggleLayer()">
                Toggle the heatmap
            </b-form-checkbox>
        </div>
        <div> The heatmap is : <strong>{{ hmTo }}</strong></div>
        <div ref="map" class="map"></div>
        <div ref="graph" class="graph">
            <p>The chosen restaurant names: {{ this.name }}</p>
            <p>The chosen restaurant id: {{ this.biz_id }}</p>
            <div style="display: none;">
                <div>
                    <label for="star"> star plot <input type="radio" v-model="comp" value="star" /></label>
                </div>
                <div>
                    <label for="box"> box plot <input type="radio" v-model="comp" value="box" /></label>
                </div>
                <div>
                    <label for="word"> word stream <input type="radio" v-model="comp" value="word" /></label>
                </div>
                <div>
                    <label for="scatter"> scatter plot <input type="radio" v-model="comp" value="scatter" /></label>
                </div>
            </div>
            <div class="plot-wrapper">
                <div class="plot-content">
                    <p>star plot</p>
                    <div id="star_container" class="svg-container" style="width: 100%">
                        <StarComponent :key=this.biz_id :business_id="business_id" :svgWidth="svgWidth"
                            v-if="star_comp" />
                    </div>
                    <hr />
                    <p>box plot</p>
                    <div id="star_container" class="svg-container" style="width: 100%">
                        <BoxComponent style="width: 100%" :key=this.biz_id :business_id="business_id"
                            :svgWidth="svgWidth" v-if="box_comp" />
                    </div>
                    <hr />
                    <p>word stream</p>
                    <div id="stream_container" class="svg-container" style="width: 100%">
                        <WordstreamComponent :business_id="business_id" :key=this.biz_id :svgWidth="streamWidth"
                            v-if="word_comp" />
                    </div>
                    <hr />
                    <p>scatter plot</p>
                    <div id="stream_container" class="svg-container" style="width: 100%">
                        <ScatterPlotComponent :business_id="business_id" :key=this.biz_id :svgWidth="streamWidth"
                            v-if="scatter_comp" />
                    </div>
                </div>
            </div>
        </div>
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
import { Heatmap as HeatmapLayer } from "ol/layer";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import Overlay from 'ol/Overlay';
import GeoJSON from 'ol/format/GeoJSON';
import CONSTANTS from '../constants';
import StarComponent from "@/components/StarComponent";
import WordstreamComponent from "@/components/WordstreamComponent";
import BoxComponent from "@/components/BoxComponent";
import ScatterPlotComponent from "@/components/ScatterPlotComponent";

export default {
    name: "TheMap",

    components: {
        StarComponent,
        WordstreamComponent,
        BoxComponent,
        ScatterPlotComponent,
    },
    props: {},
    computed: {
        business_id() {
            return this.biz_id;
        },
        star_comp() {
            return true;  // this.comp == "star";
        },
        box_comp() {
            return true;  // this.comp == "box";
        },
        word_comp() {
            return true;  // this.comp == "word";
        },
        scatter_comp() {
            return true;  // this.comp == "scatter";
        },
    },
    data() {
        return {
            map: {},
            hmTo: "hidden",
            svgWidth: 0,
            streamWidth: 0,
            svgMargin: { top: 10, right: 30, bottom: 30, left: 60 },
            comp: "star",
            biz_id: '6a4gLLFSgr-Q6CZXDLzBGQ',
            name: 'a store',
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
        this.$watch(() => this.$route.params);
    },

    mounted() {
        this.svgWidth = document.getElementById("star_container").offsetWidth * 0.85;
        this.streamWidth = document.getElementById("stream_container").offsetWidth * 0.95;
        this.fetch_geojson();
        // this.createMap();
    },

    methods: {
        toggleLayer() {
            var layer = this.map.getAllLayers();
            layer[2].setVisible(!layer[2].getVisible());
        },
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
            this.map = new Map({
                target: this.$refs['map'],
                layers: [new TileLayer({ source: new OSM() })],
                view: new View({
                    zoom: 12,
                    center: fromLonLat([-90.091533, 29.971065]),
                    constrainResolution: true
                }),
                overlays: [overlay],
            });
            var style = new Style({
                image: new CircleStyle({
                    radius: 5,
                    stroke: new Stroke({ //边界样式
                        color: '#319FD3',
                        width: 1
                    }),
                    fill: new Fill({ //⽮量图层填充颜⾊，以及透明度
                        color: 'rgba(255, 0, 0, 0.6)'
                    }),
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
                style: () => style,
            });

            var heatmapLayer = new HeatmapLayer({
                source: vectorSource,
                blur: 100,
                radius: 10,
                weight: (feature) => {
                    const review_count = feature.get('review_count');
                    return (review_count + 2000) / 10000 * 5
                },
            });

            this.map.addLayer(vectorLayer);
            this.map.addLayer(heatmapLayer);
            heatmapLayer.setVisible(false);
            this.map.on('click', (evt) => {
                if (this.map.forEachFeatureAtPixel(evt.pixel,
                    function (feat) {
                        return fromJsonFeatures.includes(feat);
                    })
                ) {
                    var name = ""
                    var business_id = ""
                    this.map.forEachFeatureAtPixel(evt.pixel, function (feat) {
                        name = feat.get('name');
                        business_id = feat.get('business_id');
                    });
                    const coordinate = evt.coordinate;
                    this.biz_id = business_id;
                    this.name = name;
                    // const child = ref('scatter_child');
                    // child.fetch_review_content(business_id);
                    // this.$refs.scatter_child.fetch_review_content();
                    // const hdms = toStringHDMS(toLonLat(coordinate));
                    content.innerHTML = '<p>You choosed: </p>' + name;
                    // $( "#graph" ).load(window.location.href + " #graph" );
                    // update graph using the new biz_id
                    // console.log(this.biz_id)
                    // const graph = this.$refs.graph;
                    // this.comp = "star";

                    // content.innerHTML = '<p>You choosed: </p><a href=/review/' + business_id + '/' + name + '>' + name + '</a > ';
                    overlay.setPosition(coordinate);
                }
            });
        },
    }
};
</script>

<style>
.map {
    position: absolute;
    left: 0px;
    width: 50%;
    height: 100%;
}

.graph {
    position: absolute;
    right: -2%;
    width: 50%;
}

div.plot-wrapper {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 200px);
}

div.plot-content {
    overflow-y: scroll;
    flex: 0 1 auto;
}

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

import * as Vue from 'vue'
import Component from 'vue-class-component'
import esriLoader from 'esri-loader'
import search from "../search/search.vue";
import esri from "esri";
import tools from "../tools/tools.vue";
import infoSearch from "../tools/infoSearch/infoSearch.vue";
import coordinateValue from "../coordinateValue/coordinateValue.vue";

// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
    components: {//子组件声明
        "search": search,
        "tools": tools,
        "infoSearch": infoSearch,
        "coordinateValue":coordinateValue
    }
})
export default class MyComponent extends Vue {
    mapView: any
    layer: Object = {}
    mapPoint: Object = {x:'',y:''}

    mounted() {
        this.$nextTick(() => {
            esriLoader.dojoRequire(["esri/Map", "esri/views/MapView", "esri/layers/MapImageLayer"], (Map, MapView,MapImageLayer) => {
                this.layer = new MapImageLayer({url: "http://192.168.12.25:6080/arcgis/rest/services/bigData/Img2014/MapServer"});
                this.mapView = new MapView({
                    container: "viewDiv",
                    map: new Map({ layers: [this.layer] })
                });
                // this.mapView.on('pointer-move', (evt) => {
                //     this.mapPoint = evt.mapPoint;
                // })
            });
        })
    }
}
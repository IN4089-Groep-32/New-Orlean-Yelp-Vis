<template>
    <div>
        <!-- <a href="/map">Back</a> -->
        <p>The chosen city names: New Orleans</p>
        <div>
            <label for="star"> Review Scale - Time <input type="radio" v-model="comp" value="star" /></label>
        </div>
        <div>
            <label for="box"> Star Rate - Time <input type="radio" v-model="comp" value="box" /></label>
        </div>
        <div>
            <label for="word"> Topics - Time <input type="radio" v-model="comp" value="word" /></label>
        </div>
        <div id="star_container" class="svg-container" style="width: 75%">
            <IStarComponent :svgWidth="svgWidth" v-if="star_comp" />
        </div>
        <div id="stream_container" class="svg-container" style="width: 100%">
            <IWordstreamComponent :svgWidth="streamWidth" v-if="word_comp" />
        </div>
    </div>
</template>

<script>
import IStarComponent from "@/components/IStarComponent";
import IWordstreamComponent from "@/components/IWordstreamComponent";
export default {
    name: "Industry",
    components: {
        IStarComponent,
        IWordstreamComponent,
    },
    computed: {
        star_comp() {
            return this.comp == "star";
        },
        box_comp() {
            return this.comp == "box";
        },
        word_comp() {
            return this.comp == "word";
        },
    },
    data: () => ({
        svgWidth: 0,
        streamWidth: 0,
        svgMargin: { top: 10, right: 30, bottom: 30, left: 60 },
        comp: "star"
    }),
    mounted() {
        this.svgWidth = document.getElementById("star_container").offsetWidth * 0.85;
        this.streamWidth = document.getElementById("stream_container").offsetWidth * 0.95;
    },

    methods: {}
};
</script>

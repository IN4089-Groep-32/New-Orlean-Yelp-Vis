<template>
    <div>
        <!-- <a href="/map">Back</a> -->
        <p>The chosen restaurant names: {{ $route.params.name }}</p>
        <p>The chosen restaurant id: {{ $route.params.id }}</p>
        <div>
            <label for="star"> star plot <input type="radio" v-model="comp" value="star" /></label>
        </div>
        <div>
            <label for="box"> box plot <input type="radio" v-model="comp" value="box" /></label>
        </div>
        <div>
            <label for="word"> word stream <input type="radio" v-model="comp" value="word" /></label>
        </div>
        <div id="star_container" class="svg-container" style="width: 75%">
            <StarComponent :business_id="business_id" :svgWidth="svgWidth" v-if="star_comp" />
        </div>
        <div id="star_container" class="svg-container" style="width: 100%">
            <BoxComponent style="width: 100%" :business_id="business_id" :svgWidth="svgWidth" v-if="box_comp" />
        </div>
        <div id="stream_container" class="svg-container" style="width: 100%">
            <WordstreamComponent :business_id="business_id" :svgWidth="streamWidth" v-if="word_comp" />
        </div>
    </div>
</template>

<script>
import StarComponent from "@/components/StarComponent";
import WordstreamComponent from "@/components/WordstreamComponent";
import BoxComponent from "@/components/BoxComponent";
export default {
    name: "Review",
    components: {
        StarComponent,
        WordstreamComponent,
        BoxComponent,
    },
    computed: {
        business_id() {
            return this.$route.params.id;
        },
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
    created() {
        this.$watch(() => this.$route.params);
    },
    mounted() {
        this.svgWidth = document.getElementById("star_container").offsetWidth * 0.85;
        this.streamWidth = document.getElementById("stream_container").offsetWidth * 0.95;
    },

    methods: {}
};
</script>

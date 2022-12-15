<template>
    <svg :width="svgWidth" :height="svgHeight">
        <g ref="plot_svg"></g>
    </svg>
</template>

<script>
import * as d3 from "d3";
import * as d3fetch from "d3-fetch";
import CONSTANTS from '../constants';
export default {
    name: "ScatterPlotComponent",
    props: {
        business_id: {
            type: String,
            required: true
        },
        svgWidth: {
            type: Number,
            required: true
        },
    },
    computed: {
        svgHeight() {
            return this.svgWidth / 1.61803398875;
        },
        gWidth() {
            return this.svgWidth - this.svgMargin.left - this.svgMargin.right;
        },
        gHeight() {
            return this.svgHeight - this.svgMargin.top - this.svgMargin.bottom;
        },
    },
    data: () => ({
        svgMargin: { top: 10, right: 30, bottom: 30, left: 60 },
    }),
    mounted() {
        d3fetch.json(CONSTANTS.PRECOMPUTED_DATA.SCATTERPLOT + "review_count_stars.json").then((scatter_data) => {
            this.draw_scatter(scatter_data);
        });
    },
    methods: {
        draw_scatter(scatter_data) {
            // append the svg object to the body of the page
            var svg = d3
                .select(this.$refs.plot_svg)
                .attr(
                    "transform",
                    "translate(" + this.svgMargin.left + "," + this.svgMargin.top + ")"
                );

            //Read the data

            // Add X axis
            var x = d3.scaleLinear()
                .domain([0, 5])
                .range([0, this.gWidth]);
            svg.append("g")
                .attr("transform", "translate(0," + this.gHeight + ")")
                .call(d3.axisBottom(x));

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, 8000])
                .range([this.gHeight, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            var data = [];
            for (const [key, value] of Object.entries(scatter_data)) {
                data.push({ stars: value.stars, review_count: value.review_count, id: key });
            }

            // Color scale: give me a specie name, I return a color
            // Add dots
            svg.append('g')
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", (d) => x(d.stars))
                .attr("cy", (d) => y(d.review_count))
                .attr("r", 5)
                .attr("fill", "#69b3a2");
        },
    },
};
</script>

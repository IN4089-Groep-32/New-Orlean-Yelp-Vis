<template>
    <div style="width: 100%">
        <svg :width="svgWidth" :height="svgHeight" style="display:inline">
            <g ref="plot_svg"></g>
        </svg>
        <!-- <div style="display:inline width:10%">
            <p>The total num of the reviews: {{ this.num }}</p>
            <p>The average useful score of the reviews: {{ this.score }}</p>
            <p>The chosen restaurant id: {{ this.biz_id }}</p>
        </div> -->
    </div>
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
        score: "default",
        num: "default",
    }),
    mounted() {
        d3fetch.json(CONSTANTS.PRECOMPUTED_DATA.SCATTERPLOT + "review_count_stars.json").then((scatter_data) => {
            this.draw_scatter(scatter_data);
        });
    },
    methods: {
        fetch_review_content(biz_id) {
            // if (this.score == "default") return "";
            fetch(CONSTANTS.PRECOMPUTED_DATA.SCATTERPLOT + "review_count_stars.json")
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.json();
                })
                .then(result => {
                    var temp = biz_id
                    this.score = result[temp].useful;
                    this.num = result[temp].review_count;
                })
                .catch(error => {
                    console.log(error);
                });
        },
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
                .domain([0, 11])
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
            var b_data = []
            for (const [key, value] of Object.entries(scatter_data)) {
                if(key != this.business_id)
                    data.push({ stars: value.stars, review_count: value.review_count, useful: value.useful, id: key });
                else
                    b_data.push({ stars: value.stars, review_count: value.review_count, useful: value.useful, id: key });
            }
            // Color scale: give me a specie name, I return a color
            // Add dots
            svg.append('g')
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", (d) => x(d.useful))
                .attr("cy", (d) => y(d.review_count))
                .attr("r", (d) => {
                    return 4
                })
                .attr("fill", (d) => { 
                    var color = ["#d7191c","#fdae61","#ffffbf","#a6d96a","#1a9641", "#000000"]
                    // if (d.id == this.business_id) {
                    //     return color[5]
                    // }
                    if (d.stars == 5 || d.stars == 4.5) {
                        return color[4]
                    } else if (d.stars == 4 || d.stars == 3.5) {
                        return color[3]
                    } else if (d.stars == 3 || d.stars == 2.5) {
                        return color[2]
                    } else if (d.stars == 2 || d.stars == 1.5) {
                        return color[1]
                    } else {
                        return color[0]
                    }
                    
                })
            svg.append('g')
                .selectAll("dot")
                .data(b_data)
                .enter()
                .append("circle")
                .attr("cx", (d) => x(d.useful))
                .attr("cy", (d) => y(d.review_count))
                .attr("r", (d) => {
                    return 4
                })
                .attr("fill", "#d7191c")
        },
    },
};
</script>

<template>
    <svg :width="svgWidth" :height="svgHeight">
        <g ref="star_svg"></g>
    </svg>
</template>

<script>
import * as d3 from "d3";
import * as d3fetch from "d3-fetch";
export default {
    name: "IStarComponent",
    props: {
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
        d3fetch.json("/api/ind/star").then((star_data) => {
            console.log(star_data);
            this.draw_star(star_data);
        });
    },
    methods: {
        draw_star(star_data) {
            var svg = d3
                .select(this.$refs.star_svg)
                .attr(
                    "transform",
                    "translate(" + this.svgMargin.left + "," + this.svgMargin.top + ")"
                );
            const x = d3
                .scaleTime()
                .domain(d3.extent(star_data, (d) => d3.timeParse("%Y-%m-%d")(d.month)))
                .range([0, this.gWidth]);
            svg
                .append("g")
                .attr("transform", "translate(0," + this.gHeight + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                .style("text-anchor", "end")
                .style("font-size", "75%")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", function (d) {
                    return "rotate(-45)";
                })
                ;
            const y = d3.scaleLinear().domain([0, 5]).range([this.gHeight, 0]);
            svg.append("g").call(d3.axisLeft(y));
            svg
                .append("path")

                .datum(star_data)
                .attr("fill", "none")
                // .attr("stroke", "#69b3a2")
                .attr("stroke", "black")
                .attr("stroke-width", 1.5)
                .attr(
                    "d",
                    d3
                        .line()
                        .curve(d3.curveBasis)
                        .x((d) => x(d3.timeParse("%Y-%m-%d")(d.month)))
                        .y((d) => y(d.star))
                );
            svg
                .append("g")
                .selectAll("dot")
                .data(star_data)
                .join("circle")
                .attr("cx", (d) => x(d3.timeParse("%Y-%m-%d")(d.month)))
                .attr("cy", (d) => y(d.star))
                .attr("r", 2)
                .attr("fill", "#69b3a2");
        },
    },
};
</script>


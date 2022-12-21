<template>
  <div style="width: 100%">
    <svg :width="svgWidth" :height="svgHeight" style="display: inline">
      <g ref="star_svg"></g>
    </svg>
    <div style="display:inline width:10%">
      <div style="display: inline">
        The chosen review with review id: {{ reviewId }}
        <p v-if="seen">{{ review_content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import * as d3fetch from "d3-fetch";
import { nest } from "d3-collection";
import CONSTANTS from "../constants";
export default {
  name: "BoxComponent",
  props: {
    business_id: {
      type: String,
      required: true,
    },
    svgWidth: {
      type: Number,
      required: true,
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
    reviewId() {
      return this.review_id.id;
    },
    seen() {
      return this.review_id.id != "default";
    },
  },
  data: () => ({
    svgMargin: { top: 10, right: 30, bottom: 30, left: 60 },
    review_id: { id: "default" },
    review_content: "",
    high_positive_content: "",
  }),
  mounted() {
    d3fetch
      .json(CONSTANTS.PRECOMPUTED_DATA.BOX + this.business_id + "_box.json")
      .then((star_data) => {
        this.draw_box(star_data);
      });
    if (this.reviewId == "default") return "";
  },
  methods: {
    fetch_review_content() {
      if (this.reviewId == "default") return "";
      fetch(
        CONSTANTS.PRECOMPUTED_DATA.REVIEWS_CONTENT +
          this.business_id +
          "_review.json"
      )
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((result) => {
          var temp = this.reviewId;
          this.review_content = result[temp].text;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    draw_box(data) {
      const BY_SEMESTER = 6;
      var svg = d3
        .select(this.$refs.star_svg)
        .attr(
          "transform",
          "translate(" + this.svgMargin.left + "," + this.svgMargin.top + ")"
        );
      var sumstat = nest() // nest function allows to group the calculation per level of a factor
        .key(function (d) {
          var new_date = d3.timeParse("%Y-%m-%d")(d.date);
          var new_month = Math.floor(new_date.getMonth() / BY_SEMESTER + 1) * 3;
          new_date.setMonth(new_month);
          return new_date.toISOString().split("T")[0];
        })
        .rollup(function (d) {
          var q1 = d3.quantile(
            d
              .map(function (g) {
                return g.stars;
              })
              .sort(d3.ascending),
            0.25
          );
          var median = d3.quantile(
            d
              .map(function (g) {
                return g.stars;
              })
              .sort(d3.ascending),
            0.5
          );
          var q3 = d3.quantile(
            d
              .map(function (g) {
                return g.stars;
              })
              .sort(d3.ascending),
            0.75
          );
          var interQuantileRange = q3 - q1;
          var min = q1 - 1.5 * interQuantileRange;
          var max = q3 + 1.5 * interQuantileRange;
          return {
            q1: q1,
            median: median,
            q3: q3,
            interQuantileRange: interQuantileRange,
            min: min,
            max: max,
          };
        })
        .entries(data);
      // Show the X scale
      const x = d3
        .scaleTime()
        .domain(
          [
            d3.timeMonth.offset(
              d3.min(data, (d) => {
                return d3.timeParse("%Y-%m-%d")(d.date);
              }),
              -10
            ),
            d3.timeMonth.offset(
              d3.max(data, (d) => {
                return d3.timeParse("%Y-%m-%d")(d.date);
              }),
              +10
            ),
          ]
        )
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
        });
      // Show the Y scale
      var y = d3.scaleLinear().domain([0, 7]).range([this.gHeight, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Show the main vertical line
      svg
        .selectAll("vertLines")
        .data(sumstat)
        .enter()
        .append("line")
        .attr("x1", function (d) {
          var new_date = d3.timeParse("%Y-%m-%d")(d.key);
          var new_month = Math.floor(new_date.getMonth() / BY_SEMESTER + 1) * 3;
          new_date.setMonth(new_month);
          var new_str = new_date.toISOString().split("T")[0];

          return x(d3.timeParse("%Y-%m-%d")(new_str));
        })
        .attr("x2", function (d) {
          var new_date = d3.timeParse("%Y-%m-%d")(d.key);
          var new_month = Math.floor(new_date.getMonth() / BY_SEMESTER + 1) * 3;
          new_date.setMonth(new_month);
          var new_str = new_date.toISOString().split("T")[0];

          return x(d3.timeParse("%Y-%m-%d")(new_str));
        })
        .attr("y1", function (d) {
          return y(d.value.min);
        })
        .attr("y2", function (d) {
          return y(d.value.max);
        })
        .attr("stroke", "black")
        .style("width", 10);
      // rectangle for the main box
      var boxWidth = 7;
      svg
        .selectAll("boxes")
        .data(sumstat)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          var new_date = d3.timeParse("%Y-%m-%d")(d.key);
          var new_month = Math.floor(new_date.getMonth() / BY_SEMESTER + 1) * 3;
          new_date.setMonth(new_month);
          var new_str = new_date.toISOString().split("T")[0];

          return x(d3.timeParse("%Y-%m-%d")(new_str)) - boxWidth / 2;
        })
        .attr("y", function (d) {
          return y(d.value.q3);
        })
        .attr("height", function (d) {
          return y(d.value.q1) - y(d.value.q3);
        })
        .attr("width", boxWidth)
        .attr("stroke", "black")
        .style("fill", "#69b3a2");
      // Show the median
      svg
        .selectAll("medianLines")
        .data(sumstat)
        .enter()
        .append("line")
        .attr("x1", function (d) {
          var new_date = d3.timeParse("%Y-%m-%d")(d.key);
          var new_month = Math.floor(new_date.getMonth() / BY_SEMESTER + 1) * 3;
          new_date.setMonth(new_month);
          var new_str = new_date.toISOString().split("T")[0];

          return x(d3.timeParse("%Y-%m-%d")(new_str)) - boxWidth / 2;
        })
        .attr("x2", function (d) {
          var new_date = d3.timeParse("%Y-%m-%d")(d.key);
          var new_month = Math.floor(new_date.getMonth() / BY_SEMESTER + 1) * 3;
          new_date.setMonth(new_month);
          var new_str = new_date.toISOString().split("T")[0];

          return x(d3.timeParse("%Y-%m-%d")(new_str)) + boxWidth / 2;
        })
        .attr("y1", function (d) {
          return y(d.value.median);
        })
        .attr("y2", function (d) {
          return y(d.value.median);
        })
        .attr("stroke", "red")
        .style("width", 20);
      // Add individual points with jitter
      var jitterWidth = 10;

      var env = this;

      svg
        .selectAll("indPoints")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          var new_date = d3.timeParse("%Y-%m-%d")(d.date);
          var new_month = Math.floor(new_date.getMonth() / BY_SEMESTER + 1) * 3;
          new_date.setMonth(new_month);
          var new_str = new_date.toISOString().split("T")[0];

          return (
            x(d3.timeParse("%Y-%m-%d")(new_str)) -
            jitterWidth / 2 +
            Math.random() * jitterWidth
          );
        })
        .attr("cy", function (d) {
          return y(d.stars);
        })
        .on("click", function (d, i) {
          env.review_id.id = i.review_id;
          env.fetch_review_content();
        })
        .attr("r", 4)
        .style("fill", "white")
        .attr("stroke", "black");
    },
  },
};
</script>

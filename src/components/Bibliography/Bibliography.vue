<template>
  <div id="Bibliography">
<!--    <svg ref="bib" :width="100" :height="100"></svg>-->
  </div>
</template>

<script>
// import * as d3 from "d3";
// import rawData from '../../assets/bib/chimera-2021.json';
const rawData = require('../../assets/bib/chimera-2021.json');

function titleCase(str) {
  let splitStr = str.toLowerCase().split(' ');
  let skipWords = ["a", "the", "on", "in", "of", "is", "to", "and"];
  for (let i = 0; i < splitStr.length; i++) {
    if (i === 0 || !skipWords.includes(splitStr[i])){
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
  }
  return splitStr.join(' ');
}

export default {
  name: "Bibliography",
  data() {
    let tagList = [];
    let yearList = [];
    for (const d of rawData) {
      let tags = d.Tags.split("; ").map(t => titleCase(t));
      for (const t of tags) {
        if (!tagList.includes(t)) {
          tagList.push(t);
        }
      }
      if (!yearList.includes(d["Publication Year"])) {
        yearList.push(d["Publication Year"]);
      }
    }
    yearList.sort();
    return {
      tags: tagList,
      years: yearList,
    }
  },
  created() {
    // this.processData();
  },
  mounted() {
    this.renderData();
  },
  methods: {
    async processData() {
      // const rawData = await require('../../assets/bib/chimera-2021.json');
      for (const d of rawData) {
        let tags = d.Tags.split("; ").map(t => titleCase(t));
        for (const t of tags) {
          if (!this.tags.includes(t)) {
            this.tags.push(t);
          }
        }
        if (!this.years.includes(d["Publication Year"])) {
          this.years.push(d["Publication Year"]);
        }
      }
      this.years.sort()
      // let years = this.years.slice(1, this.years.length);
      // console.log(this.tags);

      // rawData.forEach(d =>
      //   this.userData.push({
      //     title: titleCase(d.Title),
      //     author: d.Author.split("; "),
      //     year: d["Publication Year"],
      //     tags: d.Tags.split("; ").map(t => titleCase(t))
      //   })
      // );
    },
    renderData() {
      console.log(this.tags);
      console.log(this.years);

      // const divWidth = document.getElementById("Bibliography").clientWidth;
      // console.log("divWidth", divWidth);
      // const width = (divWidth < 1000) ? divWidth * 0.9 : 1000;
      // const height = width * 1;

      // 지도를 그리기 위한 svg 생성
      // const Svg = d3.select("#Bibliography")
      // .append("svg")

      //
      //   Svg.selectAll("mydots")
      //       .data(years)
      //       .enter()
      //       .append("circle")
      //       .attr("cx", 100)
      //       .attr("cy", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
      //       .attr("r", 7)
      //       .style("fill", "black")
      //
      //   Svg.selectAll("years")
      //       .data(years)
      //       .enter()
      //       .append("text")
      //       .attr("x", 120)
      //       .attr("y", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
      //       .style("fill", "black")
      //       .text(function(d){ return d})
      //       .attr("text-anchor", "left")
      //       .style("alignment-baseline", "middle")
      // }
    },
  }
};
</script>

<style scoped>

</style>

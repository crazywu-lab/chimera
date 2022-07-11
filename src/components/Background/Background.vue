<template>
  <div id="background" :style="'height:'+ y*100 +'vh'">
    <svg></svg>
  </div>
</template>

<script>
  import * as d3 from "d3";

  export default {
    name: "Background",
    props: {
      y: Number
    },
    methods: {
      renderGrid(){
        let divBG = document.querySelector("#background");
        let svg = d3.select('svg');
        svg.selectAll("line").remove();
        let W = window.innerWidth, H = window.innerHeight * this.y;
        divBG.style.width = W;
        divBG.style.height = H;
        let NX = Math.floor(W/60), NY = Math.floor(H/60);
        let w = W/NX, h = H/NY;
        for (let x = 1; x < NX; x++){
          svg.append('line')
              .attr('x1', x*w)
              .attr('y1', 0)
              .attr('x2', x*w)
              .attr('y2', H)
              .style("stroke", "rgba(75,75,75,0.45)")
              .style('stroke-width', 0.5)
        }
        for (let y = 1; y < NY; y++){
          svg.append('line')
              .attr('x1', 0)
              .attr('y1', y*h)
              .attr('x2', W)
              .attr('y2', y*h)
              .style("stroke", "rgba(75,75,75,0.45)")
              .style('stroke-width', 0.5)
        }
      }
    },
    mounted() {
      this.renderGrid();
      window.addEventListener('resize', this.renderGrid);
    },
    updated() {
      this.renderGrid();
    },

  }
</script>

<style>
  #background{
    width: 100%;
    position: absolute;
    z-index: -1;
  }
  svg {
    position: relative;
float:left;
    width: 100%;
    height: 100%;
  }


</style>

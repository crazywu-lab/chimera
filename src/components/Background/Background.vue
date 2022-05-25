<template>
  <div id="background">
    <svg></svg>
  </div>
</template>

<script>
  import * as d3 from "d3";

  export default {
    name: "Background",
    methods: {
      renderGrid(){
        let divBG = document.querySelector("#background");
        let svg = d3.select('svg');
        svg.selectAll("line").remove();
        let W = divBG.clientWidth, H = divBG.clientHeight;
        let NX = Math.floor(W/60), NY = Math.floor(H/60);
        let w = W/NX, h = H/NY;
        for (let x = 1; x < NX; x++){
          svg.append('line')
              .attr('x1', x*w)
              .attr('y1', 0)
              .attr('x2', x*w)
              .attr('y2', H)
              .style("stroke", "rgba(75,75,75,0.55)")
              .style('stroke-width', 0.5)
        }
        for (let y = 1; y < NY; y++){
          svg.append('line')
              .attr('x1', 0)
              .attr('y1', y*h)
              .attr('x2', W)
              .attr('y2', y*h)
              .style("stroke", "rgba(75,75,75,0.55)")
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
    width:100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
  svg {
    position: relative;
    width: 100%;
    height: 100%;
  }


</style>

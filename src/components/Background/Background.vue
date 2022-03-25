<template>
  <div id="background">
    <svg ref="svgRef"></svg>
  </div>
</template>

<script>
  import * as d3 from "d3";
  import * as Vue from "vue";

  export default {
    name: "Background",
    setup() {
      const svgRef = Vue.ref(null);
      Vue.onMounted(() => {
          const svg = d3.select(svgRef.value);
          svg.append('line')
              .attr('x1', 100)
              .attr('y1', 100)
              .attr('x2', -100)
              .attr('y2', -100)
        }
      )
      return svgRef;
    },
    mounted() {
    },
    methods: {
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


</style>

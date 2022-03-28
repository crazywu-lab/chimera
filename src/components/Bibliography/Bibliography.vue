<template>
  <div id="Bibliography"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "Bibliography",
  data() {
    return {
      dataReady: false,
    }
  },
  methods: {
  },
  async mounted() {
    const data = await d3.json('assets/chimera-2021.json');
    console.log(data);
    this.dataReady = true;
  },
}
</script>

<style scoped>

</style>

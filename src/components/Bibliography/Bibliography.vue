<template>
  <div id="Bibliography"></div>
</template>

<script>
// import * as d3 from "d3";
import JSONData from '../../assets/chimera-2021.json';
// import Vue from 'vue'

export default {
  name: "Bibliography",
  data() {
    return {
      json: JSONData,
      data: [],
      tags: [],
    }
  },
  beforeMount() {
    this.loadJson();
  },
  mounted() {
    console.log(this.data);
    console.log(this.tags);
  },
  methods: {
    loadJson(){
      this.json.forEach(d => {
        let title = d.titles.title;
        let author = d.contributors.authors;
        if (Array.isArray(author)){
          author = Array.from(author);
        } else {author = author.author}
        let year = d.dates.year;
        let keywords = Array.from(d.keywords);
        this.data.push({title: title, author: author, year: year, tags: keywords})
        this.tags.push(keywords);
      })
    }
  },
};
</script>

<style scoped>

</style>

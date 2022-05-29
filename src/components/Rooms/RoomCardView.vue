<template>
  <div class="room-cards" id="room-card-view">
    <div class = "room-card" v-for="room in rooms" :key="room.week"
         :class="room.week === weekNow ? 'room-card-now' : weekNow > room.week ? 'room-card-old' : 'room-card-future'">
        <div v-if = "room.week === weekNow" class = "link" v-on:click="showCard">WEEKLY<br>PROMPT</div>
        <div v-if = "room.week === weekNow" class = "link" style="border-top: 1px solid #757575">UPLOAD <br>ANNOTATED<br> TEXT</div>
      <div div v-if = "room.week < weekNow && room.thumbnail" class="overlay-container">
        <div class="card-img-overlay">
<!--          have no idea why line 10 is not working...-->
<!--          <img :src="'../../assets/thumbnails/' + room.thumbnail">-->
          <img v-if="room.week == 1" src="../../assets/thumbnails/leguin_1986.jpg">
          <img v-if="room.week == 2" src="../../assets/thumbnails/mills_2011.jpg">
          <img v-if="room.week == 3" src="../../assets/thumbnails/malazita_2019.webp">
          <img v-if="room.week == 4" src="../../assets/thumbnails/sebald_1995.jpeg">
        </div>
        <div class="card-overlay"/>
      </div>
    </div>
  </div>
</template>

<script>
  import * as d3 from "d3";

  export default {
    name: "RoomCardView",
    //// need to be replaced with server communication
    beforeMount() {
      this.importImages(require.context('../../assets/thumbnails/'));
    },
    mounted(){
      this.connectCards();
      window.addEventListener('resize', this.connectCards);
    },
    data() {
      return {
        //// also need to be replaced with server communication
        weekNow: 4,
        thumbnailKeys: "",
        rooms: [
          {week: 1, title: "Carrier Bag Theory of Fiction", author: "Ursula Le Guin", year: 1986, thumbnail: 'leguin_1986.jpg'},
          {week: 2, title: "On Disability and Cybernetics", author: "Mara Mills", year: 2011, thumbnail: "mills_2011.jpg"},
          {week: 3, title: "Infrastructures of abstraction: how computer science education produces anti-political subjects", author: "James W. Malazita & Korryn Resetar", year: 2019, thumbnail: "malazita_2019.webp"},
          {week: 4, title: "Rings of Saturn", author: "W.G. Sebald", year: 1995, thumbnail: 'sebald_1995.jpeg'},
          {week: 5, title: ""},
          {week: 6, title: ""},
        ]
      }
    },
    methods: {
      showCard(){
        this.$emit("showCard", true);
      },
      importImages(r) {
        r.keys().forEach(key => {
          this.thumbnailKeys.push(key);
        });
      },
      connectCards() {
        let cards = document.querySelectorAll(".room-card");
        let svg = d3.select('svg');
        for (let i = 1; i < cards.length; i++) {
          let rect0 = cards.item(i-1).getBoundingClientRect();
          let rect1 = cards.item(i).getBoundingClientRect();
          let x1 = rect0.right, x2 = rect1.left;
          let y1 = (rect0.top + rect0.bottom)/2, y2 = (rect1.top + rect1.bottom)/2;
          svg.append('line')
              .attr('x1', x1)
              .attr('y1', y1)
              .attr('x2', x2)
              .attr('y2', y2)
              .style("stroke", "rgba(75,75,75,1)")
              .style('stroke-width', 2)
              .style("stroke-dasharray", ("3, 3"));
          // draw X for future cards
          if (i >= this.weekNow) {
            svg.append('line')
                .attr('x1', rect1.left)
                .attr('y1', rect1.top)
                .attr('x2', rect1.right)
                .attr('y2', rect1.bottom)
                .style("stroke", "rgba(75,75,75,0.3)")
                .style('stroke-width', 1);
            svg.append('line')
                .attr('x1', rect1.right)
                .attr('y1', rect1.top)
                .attr('x2', rect1.left)
                .attr('y2', rect1.bottom)
                .style("stroke", "rgba(75,75,75,0.3)")
                .style('stroke-width', 1)
          }
        }
      }
    },


  }
</script>

<style scoped>
  .room-cards{
    display: flex;
    position: absolute;
    transform: translate(0, -50%);
    left: 4vw;
    top: 50vh;
  }

  .room-card {
    width: calc((100vw - 10vw) / 6 - 3vw);
    max-height: calc(((100vw - 10vw) / 6 - 3vw) * 11 / 8.5);
    aspect-ratio: 8.5 / 11;
    border: 1px solid #757575;
    margin: 1.5vw;
    align-self: center;
  }

  .room-card-old {
    background: #333333;
    box-shadow: var(--shadow);

  }

  .room-card-future {
    /*background: white;*/
    z-index: 1;
  }

  .room-card-now {
    background: white;
    display: flex;
    flex-direction: column;
    min-width: 170px;
    min-height: 220px;
    box-shadow: var(--shadow), inset 0px 0px 0px 10px #333333;

  }

  .overlay-container {
    width: 100%;
    height: 100%;
    position: relative;

  }

  .card-img-overlay, .card-overlay{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    /*border: 5px solid black;*/
  }

  .card-overlay {
    opacity: 0.85;
    background: #333333;
  }

  .card-overlay:hover {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .card-img-overlay img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: 0 auto;
    padding: 0;
  }

  .link{
    width: 100%;
    height: 50%;
  }
</style>

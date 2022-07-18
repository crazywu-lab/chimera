<template>
  <div class="full-bleed">
    <div
      class="room-card"
      v-for="room in rooms"
      :key="room.week"
      :style="'left:' + 100 * (room.week / 7 - 1 / 64) + '%'"
      :class="
        room.week === weekNow
          ? 'room-card-now' : weekNow > room.week
          ? 'room-card-old' : 'room-card-future'
      "
    >
      <div v-if="room.week === weekNow" class="card-overlay" v-on:click="showCard" />
      <!-- <div
        v-if="room.week === weekNow"
        class="link"
        style="border-top: var(--border)"
      >
        DOWNLOAD READING
      </div> -->
      <!-- <div
        v-if="room.week === weekNow"
        class="link"
        style="border-top: var(--border)"
      >
        <UploadAnotatedText :room_name="room_name" :group_name="group_name" />
      </div> -->
      <div v-if="room.week <= weekNow && room.room_name" class="card-img-overlay">
        <img :src = "getImage(room.room_name)">
      </div>
<!--      <div class="card-overlay" />-->
    </div>
  </div>
</template>

<script>
import json from "../../assets/json/thumbnail.json";

export default {
  name: "RoomCardView",
  mounted() {
    this.buildRoomData()
  },
  props: {
    weekNow: Number,
    user_name: String,
  },
  // components: {
  //   UploadAnotatedText,
  // },
  data() {
    return {
      rooms: [],
      group_name: "",
    };
  },
  methods: {
    showCard() {
      this.$emit("showCard", true);
    },
    buildRoomData() {
      console.log("username:", this.user_name);
      let thisUser = json.filter(d => d.user_name === this.user_name)[0];
      this.group_name = thisUser.group_name
      let thisGroup = json.filter(d => d.group_name === this.group_name);
      console.log("on week:",this.weekNow)
      // console.log("members_num:", this.members_num);
      for ( let i = 1; i < thisGroup.length; i++) {
        let room_no = thisUser.room_no + i
        if (room_no > thisGroup.length){
          room_no -= thisGroup.length
        }
        let room = thisGroup.filter(d => d.room_no === room_no)[0].room_name
        this.rooms.push(
            {
              "week": i,
              "room_name": room,
            }
        )
      }
      console.log(this.rooms);
    },
    getImage(path){
      return require('../../assets/thumbnail/' + this.group_name + '/' + path + '.jpeg');
    },
    // connectCards() {
    //   let cards = document.querySelectorAll(".room-card");
    //   let svg = d3.select('svg');
    //   for (let i = 1; i < cards.length; i++) {
    //     let rect0 = cards.item(i-1).getBoundingClientRect();
    //     let rect1 = cards.item(i).getBoundingClientRect();
    //     let x1 = rect0.right, x2 = rect1.left;
    //     let y1 = (rect0.top + rect0.bottom)/2, y2 = (rect1.top + rect1.bottom)/2;
    //     svg.append('line')
    //         .attr('x1', x1)
    //         .attr('y1', y1)
    //         .attr('x2', x2)
    //         .attr('y2', y2)
    //         .style("stroke", "rgba(75,75,75,1)")
    //         .style('stroke-width', 2)
    //         .style("stroke-dasharray", ("3, 3"));
    //     // draw X for future cards
    //     if (i >= this.weekNow) {
    //       svg.append('line')
    //           .attr('x1', rect1.left)
    //           .attr('y1', rect1.top)
    //           .attr('x2', rect1.right)
    //           .attr('y2', rect1.bottom)
    //           .style("stroke", "rgba(75,75,75,0.3)")
    //           .style('stroke-width', 1);
    //       svg.append('line')
    //           .attr('x1', rect1.right)
    //           .attr('y1', rect1.top)
    //           .attr('x2', rect1.left)
    //           .attr('y2', rect1.bottom)
    //           .style("stroke", "rgba(75,75,75,0.3)")
    //           .style('stroke-width', 1)
    //     }
    //   }
    // }
  },
};
</script>

<style scoped>
.room-card {
  position: absolute;
  top: 50vh;
  width: calc((100vw - 10vw) / 6 - 3vw);
  max-height: calc(((100vw - 10vw) / 6 - 3vw) * 11 / 8.5);
  min-width: 150px;
  min-height: 194px;
  aspect-ratio: 8.5 / 11;
  transform: translate(-50%, -50%);
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
}

.room-card-now {
  min-width: 170px;
  min-height: 220px;
  box-shadow: var(--shadow);
  z-index: 9;
}

.card-overlay {
  opacity: 0.85;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  box-shadow: var(--shadow), inset 0 0 0 3px #333333;
  cursor: pointer;
}


.card-img-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card-img-overlay img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0 auto;
  padding: 0;
  z-index: 1;
}

.room-card-old > .card-img-overlay img {
  filter: grayscale(95%) blur(2px);
}

.room-card-now > .card-img-overlay img {
  box-shadow:  inset 0px 0px 0px 10px #333333;
}

.room-card-old > .card-img-overlay img:hover {
  transition: filter 0.3s ease-in-out;
  filter: grayscale(20%);
}

</style>

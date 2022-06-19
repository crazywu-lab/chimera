<template>
  <div id="home-weekly" class="full-bleed">
    <Background :y="2"/>
    <RoomCardView @showCard="showCardFunc($event)" :week-now="weekNow"/>
    <PictureFrames2/>
    <Footer />
    <transition name="zoom">
      <CardWeekly v-if="showCard" @showCard="showCardFunc($event)" :week-now="weekNow"/>
    </transition>
    <NavToArchive />
    <Navbar />


  </div>
</template>

<script>

import Background from "../components/Background/Background.vue";
import Navbar from "../components/NavBar/Navbar.vue";
import NavToArchive from "../components/NavBar/NavToArchive.vue";
import RoomCardView from "../components/Rooms/RoomCardView.vue";
import CardWeekly from "../components/Public/CardWeekly.vue";
import Footer from "../components/NavBar/Footer.vue";
import PictureFrames2 from "../components/Background/PictureFrames2";


export default {
  name: "HomeWeekly",
  data() {
    return {
      userName: this.$cookie.get("chimera-place-auth"),
      showCard: true,
      weekNow: 3,
    };
  },
  created() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.showCard = false;
      }
    });
  },
  components: {
    PictureFrames2,
    RoomCardView,
    Navbar,
    NavToArchive,
    Footer,
    Background,
    CardWeekly,
  },
  methods: {
    showCardFunc(showCard){
      this.showCard = showCard
    },
  }

}
</script>


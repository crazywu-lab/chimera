<template>
  <div id="home-weekly" class="full-bleed">
    <Background :y="weekNow > 2? 2 : 1"/>
    <RoomCardView @showCard="showCardFunc($event)" :week-now="weekNow"/>
    <MediaWeekly v-if="weekNow > 2"></MediaWeekly>
<!--    <PictureFrames2/>-->
    <Footer />
    <transition name="zoom">
      <CardWeekly v-if="showCard" @showCard="showCardFunc($event)" :week-now="weekNow"/>
    </transition>
<!--    <NavToArchive />-->
    <Navbar />


  </div>
</template>

<script>

import Background from "../components/Background/Background.vue";
import Navbar from "../components/NavBar/Navbar.vue";
import RoomCardView from "../components/Rooms/RoomCardView.vue";
import CardWeekly from "../components/Public/CardWeekly.vue";
import Footer from "../components/NavBar/Footer.vue";
import MediaWeekly from "../components/Public/MediaWeekly.vue";

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
    MediaWeekly,
    // PictureFrames2,
    RoomCardView,
    Navbar,
    // NavToArchive,
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


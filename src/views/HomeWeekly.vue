<template>
  <div id="home-weekly">
    <Background />
    <Navbar />
    <Footer />
    <NavToArchive />
    <RoomCardView @showCard="showCardFunc($event)"/>
    <transition name="zoom">
      <CardWeekly v-if="showCard" @showCard="showCardFunc($event)"/>
    </transition>
  </div>
</template>

<script>

import Background from "../components/Background/Background.vue";
import Navbar from "../components/NavBar/Navbar.vue";
import NavToArchive from "../components/NavBar/NavToArchive.vue";
import Footer from "../components/NavBar/Footer.vue";
import RoomCardView from "../components/Rooms/RoomCardView.vue";
import CardWeekly from "../components/Public/CardWeekly.vue";


export default {
  name: "HomeWeekly",
  data() {
    return {
      userName: this.$cookie.get("chimera-place-auth"),
      showCard: true,
    };
  },
  components: {
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

<style scoped>

</style>

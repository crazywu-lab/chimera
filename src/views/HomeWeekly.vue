<template>
  <div id="home-weekly">
    <Background />
    <Navbar />
    <Footer />
    <NavToArchive />
    <RoomCardView />
    <CardWeekly />
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
      showSignUp: false,
      showSignIn: false,
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

}
</script>

<style scoped>

</style>

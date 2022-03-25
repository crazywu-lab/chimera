<template>
  <div>
<!--    <Background />-->
    <Navbar />
    <Footer />
    <router-link class="dashboard-link" to="/dashboard">
      Let's go!
    </router-link>
  </div>
</template>

<script>
import Navbar from "../components/NavBar/Navbar.vue";
import Footer from "../components/NavBar/Footer.vue";
// import Background from "../components/Background/Background.vue";
export default {
  name: "Home",
  data() {
    return {
      userName: this.$cookie.get("chimera-place-auth"),
    };
  },
  components: {
    Navbar, Footer,
    // Background,
  },
  methods: {
  },
};
</script>
<style scoped>

.dashboard-link {
  position: absolute;
  left: 40vw;
  top: 70vh;
  background: black;
  color: white;
  padding: 10px;
  font-size: 4rem;
  text-decoration: none;
}
.dashboard-link:hover {
  background: grey;
}
</style>

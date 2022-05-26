<template>
  <div id="Archive">
    <Navbar />
    <Bibliography />
  </div>
</template>

<script>
import Navbar from '../components/NavBar/Navbar.vue';
import Bibliography from "../components/Bibliography/Bibliography.vue";

export default {
  name: "Archive",
  components: {
    Bibliography,
    Navbar,
  },
}
</script>

<style scoped>

</style>

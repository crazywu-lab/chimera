<template>
  <div class="home-public">
    <Navbar />
    <Footer />
    <Background />
    <Public />
    <ClickAndAdd />
  </div>
    <!-- <script src="./javascripts/draggable.js"></script>
    <script src="./javascripts/bg_sketch.js"></script>
    <script src="./javascripts/bg_text.js"></script> -->
</template>

<script>
import Navbar from "../components/NavBar/Navbar.vue";
import Footer from "../components/NavBar/Footer.vue";
import Public from "../components/Public/Public.vue";
import Background from "../components/Background/Background.vue";
import ClickAndAdd from "../components/Background/PictureFrames.vue";

export default {
  name: "HomePublic",
  data() {
    return {
      userName: this.$cookie.get("chimera-place-auth"),
    };
  },
  components: {
    Background,
    ClickAndAdd,
    Public,
    Navbar,
    Footer
  },
};
</script>

<style scoped>

.column{
    width: 480px;
    margin: 0 auto;
}

.input-lead{
    font-weight: bold;
}

.circle {
    height: 80px;
    width: 80px;
    background-color: black;
    border-radius: 50%;
}
img {
    box-shadow: var(--shadow);
}
button {
    margin: 0 auto;
    background-color: white;
    font-weight: bold;
    font-size: var(--font-med);
    border: 1px solid #757575;
    border-radius: 50%;
    width: 75px;
    height: 75px;
    box-shadow: var(--shadow);
}

button:hover{
    border-width: 2px;
}

button:active{
    transform: translateY(1px);
}

nav {
    display: flex;
    justify-content: space-between;
}
.nav-element {
    margin: 20px;
}

p {
    font-size: var(--font-small);
    margin: 0 auto;
}

.bg-text {
    font-family: "IBM Plex Mono";
    font-size: var(--font-bg);
    color: #cecbc9;
    font-weight: 100;
    user-select: none;
}

div .input-lead{
    float: inside;
}

.active{
    cursor: move;
    user-select: none;
    /*pointer-events: none;*/
}

.button-container{
    position: relative;
    margin: 0 auto;
    /*-ms-transform: translate(-50%, -50%);*/
    /*transform: translate(-50%, -50%);*/
}

.text-input {
    font-size: 1.2rem;
    font-family: sans-serif;
    width: 300px;
    border: 1px solid #757575;
    padding: 7px;
    background-color: black;
    box-shadow: var(--shadow);
}

#input-explanation {
    width: 471px;
}

.text-input:hover {
    background-color: white;
    transition-delay: 500ms;
    transition-duration: 500ms;
}

</style>

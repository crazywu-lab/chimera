<template>
  <div id="home-public">
    <Background />
    <PictureFrames />
    <Navbar />
    <Footer />

    <CardPublic @showSignUp="showSignUpFunc($event)" @showSignIn="showSignInFunc($event)" @showUploadCard="showUploadCardFunc($event)"/>
    <transition name="zoom">
      <SignUpForm v-if="showSignUp" @showSignUp="showSignUpFunc($event)"/>
    </transition>
    <transition name="zoom">
      <SignInForm v-if="showSignIn" @showSignIn="showSignInFunc($event)"/>
    </transition>
    <transition name="zoom">
      <UploadCard v-if="showUploadCard" @showUploadCard="showUploadCardFunc($event)"/>
    </transition>
    <NavToArchive />

  </div>
</template>

<script>
import Background from "../components/Background/Background.vue";
import Navbar from "../components/NavBar/Navbar.vue";
import NavToArchive from "../components/NavBar/NavToArchive.vue";
import Footer from "../components/NavBar/Footer.vue";
import CardPublic from "../components/Public/CardPublic.vue";
import PictureFrames from "../components/Background/PictureFrames.vue";
import SignUpForm from '../components/Users/SignUpForm.vue';
import SignInForm from "../components/Users/SignInForm.vue";
import UploadCard from "../components/Room/UploadCard.vue";

export default {
  name: "HomePublic",
  data() {
    return {
      userName: this.$cookie.get("chimera-place-auth"),
      showSignUp: false,
      showSignIn: false,
      showUploadCard: false,
    };
  },
  created() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.showSignUp = false;
        this.showSignIn = false;
        this.showUploadCard = false;
      }
    });
  },
  components: {
    PictureFrames,
    CardPublic,
    Navbar,
    NavToArchive,
    Footer,
    SignUpForm,
    SignInForm,
    Background,
    UploadCard,
  },
  methods: {
    showSignUpFunc(showSignUp){this.showSignUp = showSignUp;},
    showSignInFunc(showSignIn){this.showSignIn = showSignIn;},
    showUploadCardFunc(showUploadCard){this.showUploadCard = showUploadCard;},
  }
};
</script>

<style scoped>

#home-public{
  display:block;
}

img {
    box-shadow: var(--shadow);
}

nav {
    display: flex;
    justify-content: space-between;
}

p {
    font-size: var(--font-small);
    margin: 0 auto;
}

div .input-lead{
    float: inside;
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


</style>

<template>
  <div id="nav-dropdown" class="">
    <router-link class="link" to="/" style="border-bottom: var(--border)" v-on:click="hideDropDown()">
      HOME
    </router-link>
    <button v-if="!userName" class="btn-signout link" v-on:click="showSignIn(); hideDropDown();">
      SIGN IN
    </button>
    <router-link v-if="userName" class="link" to="/0" style="border-bottom: var(--border)">
      READINGS
    </router-link>
    <!--        <button v-if="!userName" class="btn-signout link" v-on:click="toggleSignUpForm()">-->
    <!--          Sign Up-->
    <!--        </button>-->
    <button v-if="userName" class="btn-signout link" v-on:click="signOut">
      SIGN OUT
    </button>
    <router-link class="link" to="/admin/dashboard">
      (For admin)
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NavDropDown",
  data() {
    return {

    }
  },
  methods: {
    hideDropDown() {
      this.$emit("showNavDropDown", false);
    },
    showSignIn() {
      this.$emit("showSignIn", true);
    },

  }
}
</script>

<style scoped>
  #nav-dropdown{
    transform: none;
    position: fixed;
    width: 180px;
    border: 1px solid #757575;
    background-color: white;
    box-shadow: var(--shadow);
    top: 70px;
    right: 15px;
    z-index: 999;
  }

  button {
    border-bottom: var(--border);
  }
</style>

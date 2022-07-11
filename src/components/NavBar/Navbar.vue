<template>
  <div class="navbar flex-box">
    <router-link class="logo-home" to="/">
      <img
        @mouseover="LogoHover = true"
        v-show="!LogoHover"
        src="../../assets/chimera-logo.svg"
        style="filter: blur(1px)"
      />
      <img
        @mouseleave="LogoHover = false"
        v-show="LogoHover"
        src="../../assets/chimera-logo2.svg"
        style="filter: blur(1px)"
      />
    </router-link>
    <!-- <div class="nav-btn">
         <div v-if="hover" class="dropdown-content">
           <router-link class="dropdown-item" to="/profile">Profile</router-link>
           <router-link class="dropdown-item" to="/settings">Settings</router-link>
           <div v-if="userName" class="dropdown-item" v-on:click="signOut">Sign Out</div>
           <router-link v-else class="dropdown-item" to="/signin">Sign In</router-link>
         </div>
     </div> -->
    <div class="nav-btn" v-on:click="triggerDropDown">
      &#9776;
    </div>
    <transition name="zoom-topright">
      <div v-if="DropDown" id="nav-dropdown" class="">
        <router-link class="link" to="/" style="border-bottom: var(--border)">
          HOME
        </router-link>
        <button v-if="!userName" class="btn-signout link" v-on:click="triggerSignInForm">
          SIGN IN
        </button>
        <router-link v-if="userName && !isAdmin" class="link" to="/0" style="border-bottom: var(--border)">
          READINGS
        </router-link>
        <!-- <button v-if="!userName" class="btn-signout link" v-on:click="triggerSignUpForm">
          Sign Up
        </button> -->
        <button v-if="userName" class="btn-signout link" v-on:click="signOut">
          SIGN OUT
        </button>
        <router-link v-if="isAdmin" class="link" to="/admin/dashboard">
          (For admin)
        </router-link>
      </div>
    </transition>
    <transition name="zoom">
      <SignInForm v-if="SignInForm" @eventname="closeSignInForm"/>
    </transition>
    <!-- <transition name="zoom">
      <SignUpForm v-if="SignUpForm" @eventname="closeSignUpForm"/>
    </transition> -->
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

import SignInForm from "../Users/SignInForm.vue";
// import SignUpForm from "../Users/SignUpForm.vue";

export default {
  name: "Navbar",
  data() {
    return {
      userName: this.$cookie.get("chimera-place-auth"),
      LogoHover: false,
      DropDown: false,
      SignInForm: false,
      SignUpForm: false,
      isAdmin: false,
    };
  },
  components: {
    SignInForm,
    // SignUpForm
  },
  created() {
    this.checkIsAdmin();
    eventBus.$on("login-success", (username) => {
      this.$cookie.set("chimera-place-auth", username);
      this.SignInForm = false;
      this.checkIsAdmin();
      this.$router.push("/").catch(() => {});
    });

    eventBus.$on("signout-success", () => {
      this.$cookie.set("chimera-place-auth", "");
      this.userName = "";
      this.isAdmin = false;
      // this.$router.push("/").catch(() => {});
      console.log("cookie!");
    });
  },
  methods: {
    signOut() {
      axios
        .post("/api/users/session/signout", {})
        .then(() => {
          console.log("signed out!");
          eventBus.$emit("signout-success", true);
          this.$router.push("/").catch(() => {});
        })
        .catch((error) => {
          eventBus.$emit("signout-success", true);
          if (error.response && error.response.status != 200) {
            this.error = error.response.data.error;
          }
        });
    },
    triggerDropDown() {
      this.DropDown = !this.DropDown;
    },
    triggerSignInForm() {
      this.SignInForm = !this.SignInForm;
    },
    closeSignInForm(variable) {
      this.SignInForm = variable;
    },
    triggerSignUpForm() {
      this.SignUpForm = !this.SignUpForm;
    },
    closeSignUpForm(variable) {
      this.SignUpForm = variable;
    },
    checkIsAdmin() {
      if(this.userName == "adminadmin"){
        this.isAdmin = true;
      }
    }
  },
};
</script>

<style scoped>
img {
  height: 10vh;
  z-index: 10;
}

.card-simple{
  left: calc(50vw - 20px);
}
.navbar {
  position: fixed;
  width: calc(100vw - 40px);
  left: 20px;
  right: 20px;
  top: 20px;
  height: 10vh;
  padding: 0 0px;
  display: flex;
  justify-content: space-between;
  /*align-items: center;*/
  /*vertical-align: middle;*/
  z-index: 999;
}

button {
  border-bottom: var(--border);
}
#nav-dropdown{
  transform: none;
  position: fixed;
  width: 180px;
  border: 1px solid #757575;
  background-color: white;
  box-shadow: var(--shadow);
  top: 8vh;
  right: 15px;
}

.nav-btn {
  width: 40px;
  height: 40px;
  font-size: 40px;
  line-height: 40px;
  margin: 0;
  opacity: 0.6;
  user-select: none;
  cursor: pointer;
}

.nav-btn:hover{
  transition: 500ms ease-in-out;
  opacity: 0.9;
}

.dropdown-content {
  position: absolute;
  background-color: white;
  border: 1px solid #757575;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.dropdown-item {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.zoom-topright-enter-active,
.zoom-topright-leave-active {
  animation-duration: 150ms;
  animation-fill-mode: both;
  animation-name: zoom-topright;
}

.zoom-topright-leave-active {
  animation-direction: reverse;
}

@keyframes zoom-topright {
  from {
    opacity: 0;
    transform: scale(0.3);
    transform-origin: top right;
  }
  100% {
    transform: scale(1);
    opacity: 1;
    transform-origin: top right;
  }
}

</style>

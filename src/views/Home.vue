<template>
  <div>
    <!--    <Background />-->
    <Navbar />
    <!-- <div class="nav-btn">
         <div v-if="hover" class="dropdown-content">
           <router-link class="dropdown-item" to="/profile">Profile</router-link>
           <router-link class="dropdown-item" to="/settings">Settings</router-link>
           <div v-if="userName" class="dropdown-item" v-on:click="signOut">Sign Out</div>
           <router-link v-else class="dropdown-item" to="/signin">Sign In</router-link>
         </div>
     </div> -->
    <!-- <button v-if="userName" class="btn-signout" v-on:click="signOut">
      Sign Out
    </button> -->
    <SignInForm />
    <!-- <SignUpForm /> -->
    <Footer />
    <router-link class="dashboard-link" to="/admin/dashboard">
      Let's go!
    </router-link>
  </div>
</template>

<script>
// import { eventBus } from "../main";
// import axios from "axios";

import Navbar from "../components/NavBar/Navbar.vue";
import Footer from "../components/NavBar/Footer.vue";
import SignInForm from "../components/Users/SignInForm.vue";

export default {
  name: "Home",
  data() {
    return {
      userName: this.$cookie.get("chimera-place-auth"),
    };
  },
  components: {
    Navbar,
    Footer,
    SignInForm,
    // Background,
  },
  created: function() {

    // eventBus.$on("login-success", (username) => {
    //   this.$cookie.set("chimera-place-auth", username);
    //   // this.isSignedIn = true;
    // });

    // eventBus.$on("signout-success", () => {
    //   this.$cookie.set("chimera-place-auth", "");
    //   this.userName = "";
    //   console.log("cookie!");
    //   // if (this.$route.path !== "/") this.$router.push("/");
    // });
  },
  methods: {
    // signOut() {
    //   axios
    //     .post("/api/users/session/signout", {})
    //     .then(() => {
    //       console.log("signed out!");
    //       eventBus.$emit("signout-success", true);
    //     })
    //     .catch((error) => {
    //       eventBus.$emit("signout-success", true);
    //       if (error.response && error.response.status != 200) {
    //         this.error = error.response.data.error;
    //       }
    //     });
    // },
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

.btn-signout {
  background-color: black;
  height: 50px;
  color: white;
}
</style>

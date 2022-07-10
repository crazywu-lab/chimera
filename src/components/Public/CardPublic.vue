<template>
  <div id="card-public-wrapper">
    <div class="card-simple" id="card-public">
      <header>
        <h1>CHIMERA.PLACE</h1>
      </header>
      <p class="quote text-center">
        "How can we embody rhizomatic knowledge in hybrid realities?"
      </p>
      <p>
        Chimera is an experimental reading group that advocates reading as a
        social form. Our periodic iteration consists of the circulation of
        participant-contributed reading materials and a collective annotation
        process. The pilot scheme of Chimera has completed in the summer of 2021
        thanks to funding from the
        <a href="http://transmedia.mit.edu/" target="_blank"
          >Transmedia Storytelling Initiative</a
        >. Launched in the summer of 2022, this web portal was developed with
        artists and designers from the Art, Culture, and Technology Program and
        the Department of Architecture at MIT.
      </p>
      <div class="flex-box-horizontal flex-box">
        <div style="width:45%">
          <p>> <a v-on:click="showReadMore">read more</a></p>
        </div>
        <div style="width:55%">
          <p>> <a v-on:click="showPilot">pilot: summer 2021</a></p>
        </div>
      </div>
      <div v-if="!userName" class="link" v-on:click="showSignIn">
        SIGN IN
      </div>
      <div v-if="userName" class="link">
        <router-link class="link" to="/0">START READING</router-link>
      </div>
      <div class="link">
        <a href="mailto:hi@chimera.place">
          QUESTION & FEEDBACK
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {eventBus} from "../../main";

export default {
  name: "CardPublic",
  data() {
    return {
      userName: this.$cookie.get("chimera-place-auth"),
    }
  },
  methods: {
    showReadMore() {
      this.$emit("showReadMore", true);
    },
    showPilot(){
      this.$emit("showPilot", true);
    },
    // showSignUp(event) {
    //   console.log(event);
    //   this.$emit("showSignUp", true);
    // },
    showSignIn(event) {
      console.log(event);
      this.$emit("showSignIn", true);
    },
    // showUploadCard(event) {
    //   console.log(event);
    //   this.$emit("showUploadCard", true);
    // },
    signOut() {
      axios
          .post("/api/users/session/signout", {})
          .then(() => {
            console.log("signed out!");
            eventBus.$emit("signout-success", true);
          })
          .catch((error) => {
            eventBus.$emit("signout-success", true);
            if (error.response && error.response.status != 200) {
              this.error = error.response.data.error;
            }
          });
    },

  }
}
</script>

<style scoped>
  #card-public {
    width: 400px;
  }
  header {
    border-bottom: var(--border-dashed);
  }
  .link {
    border-top: var(--border);
  }
  a {
    color: #4d4d4d;
  }
</style>

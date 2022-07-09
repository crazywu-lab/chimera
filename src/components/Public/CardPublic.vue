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
          <p>> <a v-on:click="toggleReadMore">read more</a></p>
        </div>
        <div style="width:55%">
          <p>> <a v-on:click="togglePilot">pilot: summer 2021</a></p>
        </div>
      </div>
      <div v-if="!userName" class="link" v-on:click="showSignIn($event)">
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
    <transition name="zoom">
      <div v-if="readMore" class="card-simple" id="card-read-more">
        <div class="flex-box close-button-container">
          <button class="close-button" v-on:click="toggleReadMore">
            <svg
              style=" stroke-width: 1px; stroke: black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <line x2="20" y2="20" />
              <line x1="20" y2="20" />
            </svg>
          </button>
        </div>
        <p>
          > Each iteration will start with every participant contributing one
          reading to the reading pool.
          <br />
          > The length of the reading cycle depends on the number of
          participants, hence the number of readings contributed to the group.
          <br />
          > Throughout the course of the reading group, participants would
          receive a different weekly reading from the pool, annotate it in their
          own ways, and return it to the server. In later circulations,
          participants would start seeing accumulative annotations left by
          former participants and emerging conversations on papers. Annotations
          are noted anonymously to facilitate open and non-discriminatory
          conversations. At the end of all circulations, readings will be
          returned to their original contributors with layers of traces, notes
          and dialogues left by others. To wrap up, all participants will be
          invited to a virtual/in-person meet-up for reflection and mingling.
          <br />
          > As the process largely occurs anonymously for most of the time,
          there will be social prompts each week to foster a sense of community.
          Participants are asked to share multimedia items that represent their
          Chimera moments which will be uploaded to the web portal. Some of the
          past social prompts include: 1. Take a picture of how your Chimera
          reading activity takes place; 2. Share a favorite quote from your
          assigned reading this week; 3. An audio submission as a response to
          the specific weekly reading, etc.
        </p>
      </div>
      <div v-if="showPilot" class="card-simple" id="card-about-us">
        <div class="flex-box close-button-container">
          <button class="close-button" v-on:click="togglePilot">
            <svg
              style=" stroke-width: 1px; stroke: black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <line x2="20" y2="20" />
              <line x1="20" y2="20" />
            </svg>
          </button>
        </div>
        <div style="border-bottom: var(--border)">
          <p class="quote text-center" style="font-size: 0.8rem">
            “The aggregative nature of Chimera made participating as a reader
            especially exciting! Texts that have been published for years were
            suddenly made mutable through close reading and annotation. Seeing
            the notes accumulate over time and the meaning of the texts change
            each week because of that was truly stimulating. Being in anonymous
            intellectual conversation and debate in the margins was liberating
            in ways I rarely get to experience with academic reading.”
          </p>
          <p style="text-align: center">
            - Participant’s Testimony -
          </p>
        </div>
        <div style="border-bottom: var(--border)">
          <h2>
            SUMMER 2021 PILOT ROUND PARTICIPANTS
          </h2>
          <p class="text-center">
            Kat Huang<br />
            Weihan Jiang<br />
            <a href="https://www.shannonljohnson.com/" target="_blank"
              >Shannon L. Johnson</a
            ><br />
            Kii Kang<br />
            <a href="https://kwanq.cargo.site/" target="_blank">Kwan Q Li</a
            ><br />
            <a href="https://www.tzutung.com/" target="_blank">Lee Tzu Tung</a
            ><br />
            Meriam Soltan
          </p>
        </div>
        <h2>DOCUMENTATION</h2>
        <p class="text-center">
          <a href="https://vimeo.com/592175448/5a0182a663" target="_blank"
            >Video Journal</a
          ><br />
          (credit: Weihan Jiang)<br /><br />
          Interactive Bibliography<br />(coming in Fall 2022)<br />
        </p>
      </div>
    </transition>
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
      readMore: false,
      showPilot: false,
    }
  },
  created() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.readMore = false;
        this.showPilot = false;
      }
    });
  },
  methods: {
    toggleReadMore() {
      this.readMore = !this.readMore;
    },
    togglePilot(){
      this.showPilot=!this.showPilot
    },
    showSignUp(event) {
      console.log(event);
      this.$emit("showSignUp", true);
    },
    showSignIn(event) {
      console.log(event);
      this.$emit("showSignIn", true);
    },
    showUploadCard(event) {
      console.log(event);
      this.$emit("showUploadCard", true);
    },
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
  #card-read-more {
    width: 380px;
  }
  #card-read-more > p {
    font-size: 0.85rem;
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
  .quote {
    font-size: var(--font-med);
    font-style: italic;
  }


</style>

<template>
  <div id="card-public-wrapper">
    <div class="card-simple" id="card-public">
      <header>
        <h1>WELCOME TO CHIMERA</h1>
      </header>
      <p>
        <i
          ><center>
            "How can we embody rhizomatic knowledge in hybrid realities?"
          </center></i
        ><br />
        Chimera is an experimental reading group that advocates reading as a
        social form. Our periodic iteration consists of a circulation of
        participant-contributed reading materials and a collective annotation
        process. Funded by the
        <a href="http://transmedia.mit.edu/" target="_blank"
          >Transmedia Storytelling Initiative</a
        >, the pilot scheme of Chimera was completed in summer 2021 with
        participants from Art, Architecture, Media Lab and Comparative Media
        Studies program at MIT.
      </p>
      <div class="flex-box-horizontal flex-box">
        <div style="width:50%">
          <p>> <a v-on:click="toggleReadMore">read more</a></p>
        </div>
        <div style="width:50%">
          <p>> <a v-on:click="toggleAboutUs">about us</a></p>
        </div>
      </div>
      <div v-if="!signedIn" class="flex-box">
        <div
          class="link"
          v-on:click="showSignUp($event)"
          style="border-right: var(--border);"
        >
          SIGN UP
        </div>
        <div class="link" v-on:click="showSignIn($event)">
          SIGN IN
        </div>
      </div>
      <div v-if="signedIn" class="flex-box">
        <!-- <div class="link" v-on:click="showUploadCard($event)" style="width: 100%">
            START READING
          </div> -->
        <router-link class="link" to="/0" style="width: 100%">
          START READING
        </router-link>
      </div>
      <div class="flex-box">
        <a href="mailto:que@mit.edu" class="link" style="width: 100%">
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
          assigned reading this week; 3. An audio submission that can respond to
          the specific weekly reading, etc.
        </p>
      </div>
      <div v-if="aboutUs" class="card-simple" id="card-about-us">
        <div class="flex-box close-button-container">
          <button class="close-button" v-on:click="toggleAboutUs">
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
          Kwan Queenie Li is ...<br />
          Weihan Jiang is ...<br />
          Wonki(Kii) Kang is ...<br />
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "CardPublic",
  data() {
    return {
      readMore: false,
      aboutUs: false,
      signedIn: true,
    };
  },
  created() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.readMore = false;
        this.aboutUs = false;
      }
    });
  },
  methods: {
    toggleReadMore() {
      this.readMore = !this.readMore;
    },
    toggleAboutUs() {
      this.aboutUs = !this.aboutUs;
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
  },
};
</script>

<style scoped>
#card-public {
  width: 380px;
  z-index: 999;
}
#card-read-more {
  border-left: var(--border);
}
header {
  border-bottom: var(--border-dashed);
}
.link {
  width: 50%;
  border-top: var(--border);
  cursor: pointer;
}
</style>

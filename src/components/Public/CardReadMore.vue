<template>
  <div class="card-simple" id="card-read-more">
    <div class="flex-box close-button-container">
      <button class="close-button" v-on:click="closeCard">
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

</template>

<script>
export default {
  name: "ReadMore",
  methods: {
    closeCard(){
      this.$emit("showReadMore", false);
    },
  }
}
</script>

<style scoped>
  #card-read-more {
    width: 380px;
    z-index: 999;
  }
  #card-read-more > p {
    font-size: 0.85rem;
  }
</style>

<template>
  <div class="card-simple" id="card-pilot">
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
</template>

<script>
export default {
  name: "CardPilot",
  methods: {
    closeCard(){
      this.$emit("showPilot", false);
    },
  }
}
</script>

<style scoped>
  #card-pilot {
    z-index: 999;
  }
  .quote {
    font-size: var(--font-med);
    font-style: italic;
  }
</style>

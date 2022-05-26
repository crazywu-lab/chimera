<template>
    <div class="card-simple" id="card-public">
      <header>
        <h1>WELCOME TO CHIMERA</h1>
      </header>
      <p>
        Please submit the reading material that you wish to share below. Any
        topic is welcome, but note that you will benefit the most by
        contributing materials that you would like to see people’s response.
        It could be a reading that baffles you and wish to see how other
        people think; a reading that is related to your research interest, and
        you hope to gather more references and feedbacks; or just a favourite
        reading that influences you, and you wish to share with others! A
        reasonable page range for a weekly leisure read; we suggest no more
        than 40 pages.
      </p>
      <div class="flex-box">
        <div class="link" v-on:click="showSignUp($event)" style="border-right: 1px solid #757575;">
          SIGN UP
        </div>
        <div class="link" v-on:click="showSignIn($event)">
          SIGN IN
        </div>
      </div>
      <div class="flex-box">
        <a href="mailto:que@mit.edu" class="link" style="width: 100%">
          QUESTIONS?
        </a>
      </div>
    </div>
</template>

<script>
export default {
  name: "CardPublic",
  methods: {
    showSignUp(event) {
      console.log(event)
      this.$emit("showSignUp", true);
    },
    showSignIn(event) {
      console.log(event)
      this.$emit("showSignIn", true);
    },

  }
}
</script>

<style scoped>
  #card-public{
    width: 360px;
  }
  header{
    border-bottom: 1px dashed #757575;
  }
  .link{
    width:50%;
    border-top: 1px solid #757575;
    cursor: pointer;
  }

</style>

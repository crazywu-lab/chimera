<template>
    <div v-bind:class="[type, draggable]">
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
      <router-link tag="button" to="/archive">
        VISIT CHIMERA ARCHIVE
      </router-link>
      <router-link tag="button" to="/subscribe">
        SIGN UP FOR NEWSLETTER
      </router-link>
    </div>
</template>

<script>
export default {
  name: "Public",
  data() {
    return {
      type: 'card-simple',
      draggable: 'draggable-true'
    }
  }
}
</script>

<style scoped>
  header{
    border-bottom: 1px dashed #757575;
  }

</style>

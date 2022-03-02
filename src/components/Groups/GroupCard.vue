<template>
  <div class="group-card">

      <h1>THis is a group card.</h1>
    <router-link class="router-link" to="/groups">
        Go to group
    </router-link>
  </div>
</template>

<script>
export default {
    name: 'GroupCard',
    components: {

    }
}
</script>

<style scoped>
.group-card {
    width: 80%;
    background: grey;
}
</style>
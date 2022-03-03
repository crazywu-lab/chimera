<template>
  <div class="group-page">

    <h1>This is the group page.</h1>

    <router-link class="router-link" to="/">
        Home
    </router-link>

    <ListRooms />
  </div>
</template>

<script>
import ListRooms from '../components/Rooms/ListRooms.vue';

export default {
    name: 'GroupPage',
    components: {
        ListRooms
    }
}
</script>

<style scoped>
.group-page{
  position: static;
}
</style>
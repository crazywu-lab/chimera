<template>
  <div class="group-page">
    <Navbar />
    <h1>Reading Room Name: {{ this.$route.params.group.group_name }}</h1>
    <router-link class="router-link" to="/">
      Home
    </router-link>
    <br />
    <br />
    <br />
    <br />
    <CreateRoomPDF :group_name="group.group_name"/>
    <ListRooms />
  </div>
</template>

<script>
import Navbar from '../components/NavBar/Navbar.vue';
import ListRooms from "../components/Rooms/ListRooms.vue";
import CreateRoomPDF from "../components/Group/CreateRoomPDF.vue";

export default {
  name: "GroupPage",
  components: {
    ListRooms,
    CreateRoomPDF,
    Navbar
  },
  data() {
    return {
      group: this.$route.params.group,
    };
  },
};
</script>

<style scoped>
.group-page {
  position: static;
  margin-top: 20vh;
}
</style>

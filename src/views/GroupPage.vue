<template>
  <div class="group-page">
    <Background />
    <Navbar />
    <h1>Reading Room Name: {{ this.$route.params.group.group_name }}</h1>
    <br />
    <br />
    <br />
    <br />
    <CreateRoomPDF :group_name="group.group_name"/>
    <button class="btn-merge">Switch (careful)</button>
    <ListRooms :rooms="group.rooms"/>
    
  </div>
</template>

<script>
import Navbar from '../components/NavBar/Navbar.vue';
import ListRooms from "../components/Rooms/ListRooms.vue";
import CreateRoomPDF from "../components/Group/CreateRoomPDF.vue";
import Background from "../components/Background/Background.vue";

export default {
  name: "GroupPage",
  components: {
    Background,
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
.btn-merge {
  margin: 20px;
  background-color: black;
  color: white;
}
</style>

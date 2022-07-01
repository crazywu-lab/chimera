<template>
  <div class="group-page">
    <Background />
    <Navbar />
    <h1>Reading Group Name: {{ this.$route.params.name }}</h1>
    <br />
    <br />
    <h1>Week {{ group.currentWeek }}/{{ group.members_num - 1}}</h1>
    <br />
    <br />
    <!-- <CreateRoomPDF :group_name="group.group_name"/> -->
    <button class="btn-merge" @click="rotateReaders">ROTATE (careful)</button>
    <ListRooms :group_name="this.$route.params.name" :rooms="group.rooms" />
  </div>
</template>

<script>
import axios from "axios";

import Navbar from "../components/NavBar/Navbar.vue";
import ListRooms from "../components/Rooms/ListRooms.vue";
// import CreateRoomPDF from "../components/Group/CreateRoomPDF.vue";
import Background from "../components/Background/Background.vue";

export default {
  name: "GroupPage",
  components: {
    Background,
    ListRooms,
    // CreateRoomPDF,
    Navbar,
  },
  data() {
    return {
      group: this.$route.params.group,
    };
  },
  created() {
    this.getGroup();
  },
  methods: {
    getGroup() {
      axios
        .get("/api/groups/getGroup/" + this.$route.params.name)
        .then((response) => {
          this.group = response.data;
          console.log(this.group);
        })
        .catch((error) => {
          alert(error);
        });
    },
    rotateReaders() {
      if (confirm(`Do you really want to rotate readers?`)) {
        axios
          .put("/api/groups/rotate/" + this.$route.params.name)
          .then((response) => {
            console.log(response.data);
            this.getGroup();
            console.log("switched!");
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
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

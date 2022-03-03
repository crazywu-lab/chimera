<template>
  <div class="create-room">

  <div class="row justify-content-left">
      <div class="col-3 title-col">
          <h2 id="title">Create a reading room!</h2>
      </div>
      <div class="col-3 title-div title-left">
        <router-link class="router-link cancel-btn" to="/dashboard">Cancel</router-link>
      </div>
  </div>
    
    <form @submit.prevent="createRoom">
      <h4>Reading Room Name</h4>
      <input
        type="text"
        id="room_name"
        v-model="room.room_name"
        placeholder="untitled"
        required
      />

      <h4>{{error}}</h4>
      <br />
      <br />
      <br />
      <br />
      <input class="button" type="submit" value="Create!" />
    </form>
  </div>
</template>

<script>
import { eventBus } from "../main";
import axios from "axios";

export default {
  name: "CreateRoomPage",
  components: {
    
  },
  beforeCreate(){

  },
  data() {
    return {
      error: null,
      room: {
        room_name: "",
      },
    };
  },
  methods: {
    createRoom() {
      axios
        .post("/api/rooms/", this.room)
        .then((response) => {
          eventBus.$emit("create-room-success", {
            data: response.data,
          });
          this.$router.push("/dashboard").catch(()=>{});
        })
        .catch((error) => {
          if (error.response && error.response.status != 200) {
            this.error = error.response.data.error;
          }
        });
    },
  },
};
</script>

<style scoped>
.create-room{
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 6vh 3vw;
  font-family: "Montserrat", sans-serif;
}

.button {
  background: black;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 20px;
  border-radius: 10px;
  /* box-shadow: 1px 1px 6px 0 rgba(31, 38, 135, 0.3); */
}
.button:hover {
  background: grey;
  cursor: pointer;
}

</style>

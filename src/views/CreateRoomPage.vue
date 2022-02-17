<template>
  <div class="create-fridge">

  <div class="row justify-content-left">
      <div class="col-3 title-col">
          <h2 id="title">Create a reading room!</h2>
      </div>
      <div class="col-3 title-div title-left">
        <router-link class="router-link cancel-btn" to="/adminpage">Cancel</router-link>
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
    // let authenticated = this.$cookie.get('fritter-auth');
    //     if (!authenticated) {
    //     this.$router.push("/").catch(()=>{});;
    //     } else {
    //     this.$router.push("/createFridge").catch(()=>{});;
    //     }
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
        .post("api/rooms/", this.room)
        .then((response) => {
          eventBus.$emit("create-fridge-success", {
            data: response.data,
          });
          this.$router.push("/adminpage").catch(()=>{});
          // window.location.reload();
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
.create-fridge{
  background: #fcf8f2;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 6vh 3vw;
  font-family: "Montserrat", sans-serif;
}
.row-zero{
  height: 10vh;
  background: #fcf8f2;
}
.add-fd-btn {
  background: rgb(204, 204, 204);
  width: 80px;
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 200px;
}
.add-fd-btn > i {
  font-size: 3rem;
}
.add-fd-btn:hover {
  cursor: pointer;
  background: #cdff61;
}
.button {
  background: #cdff61;
  border: none;
  padding: 10px;
  border-radius: 20px;
  border-radius: 10px;
  /* box-shadow: 1px 1px 6px 0 rgba(31, 38, 135, 0.3); */
}
.button:hover {
  background: #cdff61;
  cursor: pointer;
}

</style>

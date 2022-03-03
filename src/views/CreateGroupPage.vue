<template>
  <div class="create-group">
    <div class="row justify-content-left">
      <div class="col-3 title-col">
        <h2 id="title">Create a new group!</h2>
      </div>
      <div class="col-3 title-div title-left">
        <router-link class="router-link cancel-btn" to="/dashboard"
          >Cancel</router-link
        >
      </div>
    </div>

    <form @submit.prevent="createRoom">
      <h4>Group Name</h4>
      <input
        type="text"
        id="room_name"
        v-model="room.room_name"
        placeholder="untitled"
        required
      />

      <h4>{{ error }}</h4>
      <br />
      <br />
      <br />
      <br />
      <input class="button" type="submit" value="Create!" />
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateGroup",
  components: {},
  beforeCreate() {},
  data() {
    return {
      error: null,
      room: {
        room_name: "",
      },
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {},
};
</script>

<style scoped>
.create-group {
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

<template>
  <div>
    <h2>Pick a member</h2>
    <form action="">
      <select v-model="key" @change="handleChange($event)" required>
        <option
          v-for="(user, index) in users"
          v-bind:value="user.username"
          v-bind:key="index"
        >
          {{ user.username }}
        </option>
      </select>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "pickMember",
  props: {
    roomNumber: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      users: [],
      key: "",
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios
        .get("/api/users/")
        .then((response) => {
          this.users = response.data;
          // console.log(this.users);
        })
        .catch((error) => {
          alert(error);
        });
    },
    handleChange(e) {
      console.log(this.roomNumber, e.target.value);
      this.$emit("eventname", this.roomNumber, e.target.value);
    },
  },
};
</script>

<style></style>

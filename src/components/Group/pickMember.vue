<template>
  <div>
    <h2>Pick a member</h2>
    <form action="">
      <select >
          <option v-for="(user, index) in users" v-bind:key="index" value=user.username>{{user.username}}</option>
      </select>
    </form>
  </div>
</template>

<script>
import axios from "axios";


export default {
  name: "pickMember",
  data() {
    return {
      users: [],
    }
  },
  created(){
    this.getUsers();
  },
  methods:{
    getUsers() {
      axios
        .get("/api/users/")
        .then((response) => {
          this.users = response.data;
          console.log(this.users);
        })
        .catch((error) => {
          alert(error);
        });
    },
  }
};
</script>

<style></style>

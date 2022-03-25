<template>
    <form class="signin-form" @submit.prevent="signIn">
        <input
          class="input-item"
          id="username"
          name="username"
          placeholder='username (at least 6 chars)'
          v-model="username" >
        <input
          class="input-item"
          id="password"
          name="password"
          placeholder='passwords (at least 8 chars)'
          v-model="password">
        <br>
        <span class='error-msg' v-if="error">{{ error }}</span>
        <br>
        <button type="submit">
          SIGN IN
        </button>
    </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default ({
  name: 'SignInForm',
  data(){
      return{
        username:"",
        password:"",
        error: null,
      }
  },
  methods:{
    signIn() {
      axios
        .post("/api/users/session/signin", {
          username: this.username,
          password: this.password
        })
        .then((response) => {
          eventBus.$emit("login-success", response.data.username);
          this.$router.push("/");
        })
        .catch((error) => {
          if (error.response && error.response.status != 200){
            this.error = error.response.data.error;
          }
        })
    }
  }
})
</script>

<style scoped>
</style>

<template>
  <form class="card-simple" @submit.prevent="signIn">
      <div class="flex-box close-button-container">
        <button class="close-button" v-on:click="closeSignIn()">
          <svg style=" stroke-width: 1px; stroke: black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <line x2="20" y2="20"/><line x1="20" y2="20"/>
          </svg>
        </button>
      </div>
      <p class="caption-top">USERNAME</p>
        <input
          class="input-item"
          id="username"
          name="username"
          placeholder=''
          v-model="username" >
      <p class="caption-top">PASSWORD</p>
      <input
          class="input-item"
          id="password"
          name="password"
          placeholder=''
          v-model="password">
        <br>
        <span class='error-msg' v-if="error">{{ error }}</span>
        <br>
        <button type="submit" class="link" style="border-top: 1px solid #757575; margin-top: 30px">
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
        showSelf: true,
      }
  },
  methods:{
    // showSignIn(event){
    //   console.log(event)
    //   this.$emit("showSignIn", false);
    // },
    closeSignIn(){
      this.$emit("eventname", false);
    },
    signIn() {
      axios
        .post("/api/users/session/signin", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          eventBus.$emit("login-success", response.data.username);
          this.$router.push("/admin/dashboard");
          console.log(response.data.message);
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

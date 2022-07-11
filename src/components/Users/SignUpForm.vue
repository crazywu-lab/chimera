<template>
    <form class="card-simple" id="signup-form" @submit.prevent="signUp">
      <div class="flex-box close-button-container">
        <button class="close-button" v-on:click="closeSignUp()">
          <svg style=" stroke-width: 1px; stroke: black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <line x2="20" y2="20"/><line x1="20" y2="20"/>
          </svg>
        </button>
      </div>
      <p class="caption-top">FULL NAME</p>
      <input
          class="input-item"
          id="name"
          name="name"
          placeholder=''
          v-model="name" >
      <p class="caption-top">E-MAIL</p>
      <input
          class="input-item"
          id="email"
          name="email"
          placeholder=''
          v-model="email" >
      <p class="caption-top">AFFILIATION</p>
      <input
          class="input-item"
          id="affiliation"
          name="affiliation"
          placeholder=''
          v-model="affiliation" >
      <p class="caption-top">USERNAME</p>
        <input
          class="input-item"
          id="username"
          name="username"
          placeholder='longer than 6 chars'
          v-model="username" >
        <p class="caption-top">PASSWORD</p>
        <input
          class="input-item"
          id="password"
          name="password"
          placeholder='longer than 6 chars'
          v-model="password" >
        <span><br>*username and password can be changed later.<br></span>
        <br>
        <span class='error-msg' v-if="error">{{ error }}</span>
        <br>
      <button type="submit" class="link" style="border-top: 1px solid #757575">
        SUBMIT
      </button>
    </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default ({
  name: 'SignUpForm',
  data(){
      return{
        name:"",
        email: "",
        affiliation: "",
        username:"",
        password:"",
        error: null,
      }
  },
  methods:{
    closeSignUp(){
      this.$emit("eventname", false);
    },
    signUp() {
      axios
        .post("/api/users/", {
          name: this.name,
          email: this.email,
          affiliation: this.affiliation,
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          eventBus.$emit("signup-success", {
            data: response.data,
          });
          // this.$router.push("/");
        })
        .catch((error) => {
          if (error.response && error.response.status != 200){
            this.error = error.response.data.error;
          }
        })
    },
      // onSubmit(){
      //   this.error = null;
      //   UserService.SignIn()
      //     .catch((error) => {
      //       if (error.response && error.response.status != 200){
      //         this.error = error.response.data.error
      //       }
      //   })
      // }
  },
})
</script>

<style scoped>

</style>


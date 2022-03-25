<template>
    <form class="signup-form" @submit.prevent="signUp">
        <h3>Create an account!</h3>
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
          v-model="password" >
        <span>username and password can be changed later.</span>
        <br>
        <span class='error-msg' v-if="error">{{ error }}</span>
        <br>
      <button type="submit">
        SIGN UP
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
        username:"",
        password:"",
        error: null
      }
  },
  methods:{
    signUp() {
      axios
        .post("/api/users/", {
          username: this.username,
          password: this.password
        })
        .then((response) => {
          eventBus.$emit("signup-success", {
            data: response.data,
          });
          this.$router.push("/signin");
        })
        .catch((error) => {
          if (error.response && error.response.status != 200){
            this.error = error.response.data.error;
          }
        })
    }
      // onSubmit(){
      //   this.error = null;
      //   UserService.SignIn()
      //     .catch((error) => {
      //       if (error.response && error.response.status != 200){
      //         this.error = error.response.data.error
      //       }
      //   })
      // }
    }
})
</script>
<style>

</style>

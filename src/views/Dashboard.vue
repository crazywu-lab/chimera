<template>
  <div class="dashboard">
    <Navbar />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <h2>This is dashboard.</h2>

    <ListGroups />
    <button class="btn-signout link" v-on:click="triggerSignUpForm">
      Create User
    </button>
    <SignUpForm v-if="SignUpForm" @eventname="closeSignUpForm" />
  </div>
</template>

<script>

import Navbar from '@/components/NavBar/Navbar.vue';

import ListGroups from '../components/Groups/ListGroups.vue';
import SignUpForm from '../components/Users/SignUpForm.vue';

import { eventBus } from "../main";

export default {
  name: 'Dashboard',
  components:{
    Navbar,
    ListGroups,
    SignUpForm
  },
  data(){
    return {
      userName: this.$cookie.get('chimera-place-auth'),
      SignUpForm: false,
    }
  },
  methods: {
    triggerSignUpForm() {
      this.SignUpForm = !this.SignUpForm;
    },
    closeSignUpForm(variable) {
      this.SignUpForm = variable;
    },
  },
  created() {
    eventBus.$on("signup-success", () => {
      this.closeSignUpForm(false);
      // location.reload();
    });
  }


  }
</script>

<style scoped>
.dashboard {
  width: 100%;
  min-height: 98vh;
  overflow-x: hidden;
  text-align: center;
}
.body-container {
  margin-top: 120px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 83vh;
}

.side-col {
  width: 30%;
  margin: 0 30px;
  background: -webkit-linear-gradient(120deg, #00e5ff, #1200ff);
  border-radius: 20px;
  box-shadow: 1px 1px 6px 0 rgba(31, 38, 135, 0.3);
}

.router-link {
  background-color: rgb(180, 216, 233);
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 10px 12px;
  text-align: center;
  transition: all 200ms;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.btn-signout {
  background-color: black;
  color: white;
}
</style>

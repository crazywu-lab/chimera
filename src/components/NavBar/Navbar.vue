<template>
    <div class="navbar">
      <router-link class="logo-home" to="/">Chimera</router-link>
      <div class="nav-btn">
          <div class="dropdown-content">
            <router-link class="dropdown-item" to="/profile">Profile</router-link>
            <router-link class="dropdown-item" to="/settings">Settings</router-link>
            <div v-if="userName" class="dropdown-item" v-on:click="signOut">Sign Out</div>
            <router-link v-else class="dropdown-item" to="/signin">Sign In</router-link>
          </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default ({
  name: 'Navbar',
  data() {
      return {
          userName: this.$cookie.get('chimera-place-auth')
      }
  },
    created(){
        eventBus.$on("signout-success", () => {
            this.$cookie.set("chimera-place-auth", '');
            this.userName = '';
            console.log("cookie!");
            if(this.$route.path !== '/') this.$router.push("/");
        });
    },
    methods:{
        signOut() {
        axios
            .post("/api/users/session/signout", {
            })
            .then(() => {
                console.log("signed out!");
                eventBus.$emit("signout-success", true);
            })
            .catch((error) => {
                eventBus.$emit('signout-success', true);
                if (error.response && error.response.status != 200){
                    this.error = error.response.data.error;
            }
            })
        }
    }
})
</script>

<style scoped>

.navbar {
  position: fixed;
  left: 20px;
  right: 25px;
  top: 20px;
  height: 80px;
  padding: 0 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-home {
}

.nav-btn {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: black;
}

.nav-btn:hover {
  box-shadow: 0 0 20px 5px yellowgreen;
  transition: all 0.2s ease-out;
}

.nav-btn:hover .dropdown-content {
  display: block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-item {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-item:hover {
  background-color: rgb(131, 219, 253);
  cursor: pointer;
  transition: all 0.2s ease-out;
}

</style>

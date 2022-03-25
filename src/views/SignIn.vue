<template>
    <div>
        <Navbar />
        <div class="card-simple">
            <SignInForm />
            <div v-if="isSignedIn">
                <p>Signed In!</p>
            </div>
            <div v-else class="create-account">
                <router-link tag="button" to="/signup">CREATE A NEW ACCOUNT</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/NavBar/Navbar.vue';
import SignInForm from '@/components/Users/SignInForm.vue';
import { eventBus } from "../main";

export default {
  name: 'Signin',
  data() {
      return {
          isSignedIn: false
      }
  },
  components:{
    SignInForm, Navbar
  },
    created: function() {
        let auth = this.$cookie.get('chimera-place-auth');
        if (auth) {
            this.isSignedIn = true;
        }

        eventBus.$on("login-success", (username) => {
            this.$cookie.set('chimera-place-auth', username);
            this.isSignedIn = true;
        })
    }
  }

</script>
<style scoped>
  .card-simple {
    top: calc(10vh + 80px);
  }
</style>

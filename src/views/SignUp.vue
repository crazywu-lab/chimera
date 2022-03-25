<template>
  <div>
    <Navbar />
    <div class="card-simple">
      <SignUpForm />
    </div>
  </div>
</template>

<script>
import Navbar from '../components/NavBar/Navbar.vue';
import SignUpForm from '@/components/Users/SignUpForm.vue';

export default {
  name: 'Signup',
  components:{
    Navbar, SignUpForm,
  }

  }

</script>
<style scoped>
  .card-simple{
    top: calc(10vh + 80px);
  }
</style>

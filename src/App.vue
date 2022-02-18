<template>
  <div id="app">
    <router-view ></router-view>
  </div>
  
</template>

<script>
//import { eventBus } from "./main";

export default {
  name: 'App',
  beforeCreate: function() {
    let authenticated = this.$cookie.get('chimera-place-auth');
    if (!authenticated) {
      if(this.$route.path !== '/') this.$router.push("/");
    }
  },
  components: {},
  computed: {},
  methods: {},
};
</script>

<style>
</style>

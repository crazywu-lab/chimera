<template>
  <router-link class="create-group-card" to="/createGroup">
    Create a new group
  </router-link>
</template>

<script>
export default {
  name: "CreateGroupCard",
  components: {},
};
</script>

<style scoped>
.create-group-card {
  width: 80%;
  height: 20vh;
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 3rem;
  background-color: black;
  border-radius: 10px;
  box-shadow: 1px 1px 6px 0 rgba(31, 38, 135, 0.3);
}
</style>
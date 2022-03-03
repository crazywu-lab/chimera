<template>
  <router-link class="router-link add-card" to="/createRoom">
      Add Reading Room +
  </router-link>
</template>

<script>
export default {
  name: "AddCard",
}
</script>

<style>
.router-link {
  text-decoration: none;
}
.add-card {
  width: 30%;
  height: 20vh;
  margin: 10px;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 2rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  color: white;
}
</style>
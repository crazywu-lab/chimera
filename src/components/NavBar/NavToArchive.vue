<template>
  <div id="nav-to-archive">
    <router-link tag="nav" to="/archive">
      CHIMERA<br>ARCHIVE
      <div class="arrow-wrapper">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/>
        </svg>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NavToArchive"
}
</script>

<style scoped>

.arrow-wrapper {
  margin-left: 8px;
  margin-right: 5px;
}

.arrow-wrapper :hover{
  animation: arrow-right 1s ease-in-out infinite;
}

nav {
  transform: translate(0,-50%);
  cursor: pointer;
  font-weight: bold;
  position: absolute;
  display: flex;
  right: 0;
  top: 50vh;
}


@keyframes arrow-right {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-5px, 0);
  }
}

</style>

<template>
  <div class = "footer">
    <div>
      <p>credit</p>
    </div>
    <div>
      <a href = "http://transmedia.mit.edu/" target="_blank">
        <img src = "../../assets/tsi-logo.png">
      </a>
      <img src = "../../assets/mit-logo.svg">
    </div>

  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
  .footer{
    position: relative;
    justify-content: space-between;
    top: 100vh;
    width: 100vw;
    display: flex;
    border-top: 1px dashed #757575;
  }
  img{
    height: 40px;
    margin: 20px;
  }
  p{
    color: grey;
    font-size: 0.8rem;
  }
</style>

<template>
  <div class="footer">
    <div>
      <p>credit<br>
        designed and developed by <a>Kii Kang</a><br>
        back-end development by <a>Charles Wu</a>
      </p>
    </div>
    <div class="flex-box-horizontal">
      <div class="img-container">
      <a href = "http://transmedia.mit.edu/" target="_blank">
        <img class="logo" src = "../../assets/tsi-logo.png">
      </a></div>
      <div class="img-container"><img class="logo" src = "../../assets/mit-logo.svg"></div>
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
    background: white;
    justify-content: space-between;
    width: 100vw;
    display: flex;
    border-top: 1px dashed #757575;
    height: 8vh;
  }
  .img-container{
    height: 50%;
    margin: 15px;
  }
  img{
    max-height: 100%;
  }
  p{
    color: grey;
    font-size: var(--font-small);
  }
  a{
    color: #333333;
  }

  @media (max-width: 500px) {
    p{
      font-size: calc(0.75 * var(--font-small));
    }
  }
</style>

<template>
  <div class="full-bleed" @mousemove="blurImages">
    <div class="img-wrapper" v-for="img in images" :key="img.name">
      <img :src="img" alt=""/>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClickAndAdd",
  beforeMount() {
    this.importAll(require.context('../../assets/img/'));
  },
  mounted() {
    this.spreadImages();
  },
  data() {
    return{
      images: [],

    }
  },
  methods: {
    importAll(r) {
      r.keys().forEach(key => {
        this.images.push(r(key));
      });
    },
    spreadImages() {
      const wrappers = document.getElementsByClassName("img-wrapper");
      let windowW = window.innerWidth, windowH = window.innerHeight;
      for (let i = 0; i < wrappers.length; i++) {
        let theta = 2 * i * Math.PI/wrappers.length;
        let r = (Math.random() + 1)/4;
        let w = Math.random()/2 * windowW + 150;
        let x = String(parseInt(r * windowW * Math.cos(theta)) -50 + windowW/2) + 'px';
        let y = String(parseInt(r * windowH * Math.sin(theta)) -100 + windowH/2) + 'px';
        wrappers.item(i).style.transform += 'translateX(+' + x + ')';
        wrappers.item(i).style.transform += 'translateY(+' + y + ')';
        wrappers.item(i).style.width = String(w) + 'px';
      }
    },
    blurImages(event) {
      const wrappers = document.getElementsByClassName("img-wrapper");
      for (let i = 0; i < wrappers.length; i++) {
        let divRect = wrappers.item(i).getBoundingClientRect();
        let X = (divRect.top + divRect.bottom)/2, Y = (divRect.left + divRect.right)/2;
        let blur = Math.sqrt((X - event.x)**2 + (Y - event.y+80)**2)/100;
        wrappers.item(i).style.filter = 'blur(' + String(parseInt(blur)) + 'px)';
      }
    }
  }
}
</script>

<style scoped>
  .full-bleed{
    position: absolute;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }
  .img-wrapper{
    display: block;
    box-shadow: var(--shadow);
    position: relative;
    transform: translateX(-50%);
    padding: 0;
    width: 100px;
    z-index: -1;
  }
  img{
    position:absolute;
    max-width: 100%;
    height: auto;
    filter: blur(1px);
  }
</style>

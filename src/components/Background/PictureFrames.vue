<template>
  <div class="full-bleed" @mousemove="blurImages">
    <div class="img-wrapper" v-for="img in images" :key="img.name">
      <img :src="img"/>
    </div>
  </div>
</template>

<script>

export default {
  name: "ClickAndAdd",
  beforeMount() {
    this.importImages(require.context('../../assets/img/'));
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
    importImages(r) {
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
        let w = String(parseInt(Math.random()*windowW/5) + windowW/5);
        let x = r * windowW * Math.cos(theta) + windowW/2;
        let y = r * (windowH-100) * Math.sin(theta) + windowH/2;
        if ( x+w/2+100 > windowW ){ x = windowW-w/2-100 }
        if ( x-w/2-100 < 0 ){ x = 100+w/2 }
        wrappers.item(i).style.left = String(x/windowW*100) + "%";
        wrappers.item(i).style.top = String(y/windowH*100) + "%";
        wrappers.item(i).style.width = String(w/windowW*100) + '%';
      }
    },
    blurImages(event) {
      const imgWrappers = document.getElementsByClassName("img-wrapper");
      for (let i = 0; i < imgWrappers.length; i++) {
        let divRect = imgWrappers.item(i).getBoundingClientRect();
        let X = (divRect.left + divRect.right)/2, Y = (divRect.top + divRect.bottom)/2;
        let blur = Math.sqrt((X - event.x)**2 + (Y - event.y+100)**2)/100;
        imgWrappers.item(i).style.filter = 'blur(' + String(parseInt(blur)) + 'px)';
      }
    },
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
    padding: 0;
    z-index: -1;
  }
  img{
    position:absolute;
    max-width: 100%;
    transform: translate(-50%,-50%);

    filter: blur(2px);
  }
</style>

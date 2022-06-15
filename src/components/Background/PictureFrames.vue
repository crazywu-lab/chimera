<template>
  <div class="full-bleed" @mousemove="blurImages">
    <div class="img-wrapper" v-for="img in images" :key="img.name" @mouseenter="bringToFront" @mouseleave="bringToBack">
      <img class="picture-frame" :src="img"/>
    </div>
  </div>
</template>

<script>

export default {
  name: "PictureFrames",
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
        let w = String(parseInt((Math.random()+1)*(windowW+windowH)/10));
        let x = r * windowW * Math.cos(theta) + windowW/2;
        let y = r * (windowH) * Math.sin(theta) + windowH/2;
        if ( x+w/2 > windowW ){ x = windowW-w/2 }
        if ( x-w/2 < 0 ){ x = w/2 }
        wrappers.item(i).style.left = String(x/windowW*100) + "%";
        wrappers.item(i).style.top = String(y/windowH*100) + "%";
        wrappers.item(i).style.width = String(w/windowW*100) + '%';
      }
    },
    blurImages(event) {
      const frames = document.getElementsByClassName("picture-frame");
      for (let i = 0; i < frames.length; i++) {
        let divRect = frames.item(i).getBoundingClientRect();
        let X = (divRect.left + divRect.right)/2, Y = (divRect.top + divRect.bottom)/2;
        let blur = Math.sqrt((X - event.x)**2 + (Y - event.y+100)**2)/100;
        frames.item(i).style.filter = 'blur(' + String(parseInt(blur)) + 'px) grayscale(100%)' ;
      }
    },
    bringToFront(event) {
      event.target.style.zIndex += 1;
    },
    bringToBack(event) {
      event.target.style.zIndex -= 1;
    }
  }
}
</script>

<style scoped>
  .full-bleed{
    position: absolute;
    /*overflow: hidden;*/
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
  }
  .img-wrapper{
    display: block;
    position: relative;
    padding: 0;
    margin: 0;
    /*z-index: -1;*/
  }
  .picture-frame {
    position:absolute;
    max-width: 100%;
    transform: translate(-50%,-50%);
    filter: blur(1px) grayscale(100%);
    box-shadow: var(--shadow);
  }
</style>

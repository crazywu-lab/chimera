<template>
  <div class="full-bleed" @mousemove="blurImages">
    <div class="img-wrapper" v-for="d in data" :key="d.id" @mouseenter="bringToFront" @mouseleave="bringToBack">
      <img class="picture-frame" :src="d.path" :alt="d.title" :title="d.title"/>
    </div>
  </div>
</template>

<script>
import json from "../../assets/json/img.json";

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
      data: []
    }
  },
  methods: {
    importImages(r) {
      r.keys().forEach((key, i) => {
        let d = json[i];
        this.data.push(
            {"path": r(key),
              "id": d.id,
              "width": d.width,
              "height": d.height,
              "title": d.title,
              // "link": d.link
            });
      });
    },
    spreadImages() {
      const wrappers = document.getElementsByClassName("img-wrapper");
      let windowW = window.innerWidth, windowH = window.innerHeight;
      for (let i = 0; i < wrappers.length; i++) {
        let isPortrait = this.data[i].width > this.data[i].height;
        let theta = 2 * i * Math.PI/wrappers.length;
        let r = (Math.random() + 2)/8;
        let x = r * windowW * Math.cos(theta) + windowW/2;
        let y = r * windowH * Math.sin(theta) + windowH/2;
        let w = parseInt((Math.random()+2)*(windowW+windowH)/12);
        if (isPortrait) {
          if ( x+w/2 > windowW ){ x = windowW-w/2 }
          if ( x-w/2 < 0 ){ x = w/2 }
        } else {
          let h = parseInt((Math.random()+2)*(windowW+windowH)/12);
          w = h * this.data[i].width / this.data[i].height
          if ( y+h/2 > windowH-100 ){ y = windowH-h/2-100 }
          if ( y-h/2 < 0 ){ y = h/2 }
        }
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

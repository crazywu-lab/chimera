<template>
  <div class="full-bleed" id="media-weekly">
    <div class="media-container"
       v-for="d in data"
       :key="d.id"
       @mouseenter="bringToFront"
       @mouseleave="bringToBack">
      <img v-if="weekNow !== 4 || weekNow !== 7" class="picture-frame" :src="d.path" :alt="d.id"/>
      <div v-if="weekNow === 4" class="quote">
        {{d.text}}
      </div>
    </div>
  </div>
</template>

<script>
// need to be replaced with the images in the media db from past week
import json2 from "../../assets/json/2.json";
import json3 from "../../assets/json/3.json";

export default {
  name: "MediaWeekly",
  props: {
    weekNow: Number,
  },
  beforeMount() {
    if (this.weekNow === 4){
      this.importTexts();
    }
    else {
      // need to be replaced with the images in the media db from past week
      this.importImages(require.context('../../assets/weekly/2'));
    }
  },
  mounted() {
    this.spreadMedia();
  },
  data() {
    return{
      data: []
    }
  },
  methods: {
    importImages(r) {
      r.keys().forEach((key, i) => {
        let d = json2[i];
        this.data.push(
            {"path": r(key),
              "id": d.id,
              "width": d.width,
              "height": d.height,
            });
      });
    },
    importTexts() {
      // this is a placeholder
      this.data = json3;
      // this.data =
      //      [
      //        {"id": 1, "text": "Lorem ipsum dolor sit amet. Qui reprehenderit odio sit error molestiae ex voluptatem temporibus in fuga molestias cum tempora harum aut ipsam accusamus. Et iure iste 33 totam excepturi qui earum quidem est eligendi voluptas sed quod blanditiis nam doloribus voluptas. Nam assumenda harum nam odio aliquam At tenetur pariatur!"},
      //        {"id": 2, "text": "Lorem ipsum dolor sit amet. Eos nostrum quidem et sint tempora ut magnam reiciendis. Et voluptas optio ut autem dolorum est neque nemo 33 magnam illo aut laboriosam dolores. Ut quam laudantium quo corporis sunt qui cupiditate nesciunt."},
      //        {"id": 3, "text": "Lorem ipsum dolor sit amet. Qui reprehenderit odio sit error molestiae ex voluptatem temporibus in fuga molestias cum tempora harum aut ipsam accusamus. Et iure iste 33 totam excepturi qui earum quidem est eligendi voluptas sed quod blanditiis nam doloribus voluptas. Nam assumenda harum nam odio aliquam At tenetur pariatur!"},
      //        {"id": 4, "text": "Lorem ipsum dolor sit amet. Eos nostrum quidem et sint tempora ut magnam reiciendis. Et voluptas optio ut autem dolorum est neque nemo 33 magnam illo aut laboriosam dolores. Ut quam laudantium quo corporis sunt qui cupiditate nesciunt."},
      //        {"id": 5, "text": "Lorem ipsum dolor sit amet. Qui reprehenderit odio sit error molestiae ex voluptatem temporibus in fuga molestias cum tempora harum aut ipsam accusamus. Et iure iste 33 totam excepturi qui earum quidem est eligendi voluptas sed quod blanditiis nam doloribus voluptas. Nam assumenda harum nam odio aliquam At tenetur pariatur!"},
      //        {"id": 6, "text": "Lorem ipsum dolor sit amet. Eos nostrum quidem et sint tempora ut magnam reiciendis. Et voluptas optio ut autem dolorum est neque nemo 33 magnam illo aut laboriosam dolores. Ut quam laudantium quo corporis sunt qui cupiditate nesciunt."},
      //        {"id": 7, "text": "Lorem ipsum dolor sit amet. Eos nostrum quidem et sint tempora ut magnam reiciendis. Et voluptas optio ut autem dolorum est neque nemo 33 magnam illo aut laboriosam dolores. Ut quam laudantium quo corporis sunt qui cupiditate nesciunt."}
      //      ]

    },
    spreadMedia() {
      const wrappers = document.getElementsByClassName("media-container");
      let windowW = window.innerWidth, windowH = window.innerHeight;
      for (let i = 0; i < wrappers.length; i++) {
        let isPortrait = this.data[i].width >= this.data[i].height;
        let theta = 2 * i * Math.PI/wrappers.length;
        let r = (Math.random() + 2)/9;
        let x = r * windowW * Math.cos(theta) + windowW/2;
        let y = r * windowH * Math.sin(theta) + windowH/2;
        let w = parseInt((Math.random()+2)*(windowW+windowH)/16);
        if (isPortrait) {
          if ( x+w/2 > windowW ){ x = windowW-w/2 }
          if ( x-w/2 < 0 ){ x = w/2 }
        } else {
          let h = parseInt((Math.random()+2)*(windowW+windowH)/16);
          w = h * this.data[i].width / this.data[i].height
          if ( y+h/2 > windowH-100 ){ y = windowH-h/2-100 }
          if ( y-h/2 < 0 ){ y = h/2 }
        }
        wrappers.item(i).style.left = String(x/windowW*100) + "%";
        wrappers.item(i).style.top = String(y/windowH*100) + "%";
        wrappers.item(i).style.width = String(w/windowW*100) + '%';
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
.media-container{
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
  filter: grayscale(90%);
  box-shadow: var(--shadow);
}

.picture-frame:hover {
  filter: grayscale(30%);
  transition: filter 200ms;
}
.quote{
  position: absolute;
  font-size: var(--font-med);
  padding: 5px;
  width: 240px;
  font-family: sans-serif;
  font-style: italic;
  color: black;
  transform: translate(-50%,-50%);
  background: white;
  border: var(--border);
  box-shadow: var(--shadow);
}

</style>

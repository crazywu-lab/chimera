<template>
  <div class="card-simple" id="card-weekly">
    <div class="flex-box close-button-container">
      <button type="close" class="close-button" v-on:click="showCard">
        <svg style=" stroke-width: 1px; stroke: black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <line x2="20" y2="20"/><line x1="20" y2="20"/>
        </svg>
      </button>
    </div>
    <p>
      Your reading for week {{weekNow}} has arrived! Download the reading below, and upload the annotated
      PDF before <b>{{getDeadline.toLocaleString('default', { month: 'short' })}} {{getDeadline.getDate()}}</b>.
    </p>
    <div class="flex-box">
      <div class="link" style="border-top: var(--border); border-bottom: var(--border)">
        DOWNLOAD TEXT
      </div>
    </div>
    <div v-if="weekNow === 2">
      <p>
        For this week, upload an image of your reading environment below.
        It could be a photo of a park on a nice summer day, on your couch with your pet taking a nap next to
        you.
      </p>
      <p class="caption-top">IMAGE TITLE</p>
      <input
          class="input-item"
          id="weekly_media_title"
          name="weekly_media_title"
          placeholder=''
          v-model="weekly_media_title" >

      <div class="flex-box">
        <div class="media-upload">
          <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" style="stroke-width:1px; stroke:#757575;">
            <path d="M0,0 l300,300"></path>
            <path d="m300,0 l-300,300"></path>
          </svg>
        </div>
      </div>
    </div>
    <div v-if="weekNow === 3">
      <p>
        For this week, upload an image inspired by the reading of this week, be it a collage, sketch, stock image,
        or anything that came up in your mind while reading.
      </p>
      <p class="caption-top">IMAGE TITLE</p>
      <input
          class="input-item"
          id="weekly_media_title"
          name="weekly_media_title"
          placeholder=''
          v-model="weekly_media_title" >

      <div class="flex-box">
        <div class="media-upload">
          <svg width="320" height="320" xmlns="http://www.w3.org/2000/svg" style="stroke-width:1px; stroke:#757575;">
            <path d="M0,0 l320,320"></path>
            <path d="m320,0 l-320,320"></path>
          </svg>
        </div>
      </div>
    </div>
    <div v-if="weekNow === 4">
      <p>
        For this week, share one favorite quote from this week's reading.
      </p>
      <textarea rows="10" name="fav-quote"></textarea>
    </div>
    <div v-if="weekNow === 5">
      <p>
        For this week, upload a screenshot of one annotation in your current reading, and your interaction with it.
        Do you like the annotation your reading mates made? Or do you have different opinions, or add anything to it?
      </p>
      <div class="flex-box">
        <div class="media-upload">
          <svg width="320" height="320" xmlns="http://www.w3.org/2000/svg" style="stroke-width:1px; stroke:#757575;">
            <path d="M0,0 l320,320"></path>
            <path d="m320,0 l-320,320"></path>
          </svg>
        </div>
      </div>
    </div>
    <div v-if="weekNow === 6">
      <p>
        For this week, upload an audio recording of your reading environment,
        or any audio footage you took this week. Feel free to mix it with other
        sources of audio. You can use copyright-free materials online
        such as <a href="http://freesound.org" target="_blank">Freesound</a>, but
        make sure to include at least one source of sound that you recorded or made.
      </p><br>
      <audio controls>
        <source>
      </audio><br><br>
    </div>
    <div v-if="weekNow === 7">
      <p>

      </p>
    </div>
    <div v-if="weekNow !== 1" class="flex-box" style="border-top: var(--border)">
      <div class="link" style="border-right: var(--border)">
        SUBMIT
      </div>
      <div class="link" id="media-delete" v-on:click="handleClick">
        DELETE
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardWeekly",
  props: {
    weekNow: Number,
  },
  data() {
    return {
      showSelf: true,
      weekly_media_title: "",
      startDate: new Date(2022, 6, 11),
    }
  },
  mounted(){
    this.addDropZone();
  },
  computed: {
    getDeadline() {
      let deadline = new Date();
      deadline.setDate(this.startDate.getDate() + 7 * this.weekNow);
      return deadline;
    }
  },
  methods: {
    showCard(){
      this.$emit("showCard", false);
    },
    handleClick(){
      document.querySelector("textarea").value = '';
    },
    addDropZone() {
      const dropzone = document.querySelector('.media-upload');

      dropzone.addEventListener('dragenter', event => {
        event.preventDefault();
      });

      dropzone.addEventListener('dragleave', event => {
        event.preventDefault();
      });

      dropzone.addEventListener('dragover', event => {
        event.preventDefault();
      });

      dropzone.addEventListener('drop', event => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('loadend', () => {
          const img = document.createElement('img');
          img.src = reader.result;
          img.style = "width: 330px; height: 333px; object-fit: cover; "
          let svg = dropzone.querySelector("svg");
          dropzone.appendChild(img);
          svg.remove();

        })
      });
    }
  }
}
</script>

<style scoped>
#card-weekly{
  position: fixed;
  z-index: 10;
}

.media-upload{
  width: 320px;
  border: var(--border);
  margin: 15px auto;
  top: 0;
  left: 0;
  padding-bottom: -1px;

}
.media-upload img {
  width: 320px;
  height: 320px;
  object-fit: cover;
  margin: 0;
  padding: 0;
  position: fixed;
}
.flex-box {
  padding: 0;
  margin: 0;
}

textarea {
  width: calc(100% - 30px);
  margin: 15px auto;
  display: block;
}

</style>

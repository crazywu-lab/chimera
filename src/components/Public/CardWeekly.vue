<template>
  <div class="card-simple" id="card-weekly">
    <div class="flex-box close-button-container">
      <button type="close" class="close-button" v-on:click="hideCardWeekly">
        <svg
          style=" stroke-width: 1px; stroke: black"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <line x2="20" y2="20" />
          <line x1="20" y2="20" />
        </svg>
      </button>
    </div>
    <p>
      Your reading for week {{ weekNow }} has arrived! Download the reading
      below, and upload the annotated PDF before
      <b
        >{{ getDeadline.toLocaleString("default", { month: "long" }) }}
        {{ getDeadline.getDate() }}</b
      >.
    </p>
    <div class="flex-box flex-box-vertical">
      <div
        class="link"
        style="border-top: var(--border); border-bottom: var(--border)"
        @click="downloadLatestPDF"
      >
        DOWNLOAD TEXT
      </div>
      <div v-if="!isUploaded" class="link" style="border-bottom: var(--border)">
        <UploadAnotatedText :room_name="room_name" :group_name="group_name" />
      </div>
      <div v-if="isUploaded" class="message" style="border-bottom: var(--border); background-color: #757575; color: white;">
        You have uploaded your file successfully
      </div>
    </div>
    <div v-if="weekNow === 1">
      <p>
        In the following weeks, there will be social prompts to foster a sense
        of community within the reading groups. You will be asked to share
        multimedia items that represent their Chimera moments that can be
        uploaded to the web portal. Some of the prompts include:
        <br />
        > Photography of where your reading activity is taking place <br />
        > Favorite quote from the reading <br />
        > Audio recording or composition as a response to the specific weekly
        reading
      </p>
    </div>
    <div v-if="weekNow === 2">
      <p>
        For this week, send an image of your reading environment. It
        could be a photo of a park on a nice summer day, on your couch with your
        pet taking a nap next to you, or an image inspired by the reading of this week,
        be it a collage, sketch, stock image, or anything that came up in your mind during reading.
      </p>
          <!--      <p class="caption-top">IMAGE TITLE</p>-->
      <!--      <input-->
      <!--          :id="'weekly_media_title'+weekNow"-->
      <!--          ref="input"-->
      <!--          class="input-item"-->
      <!--          name="weekly_media_title"-->
      <!--          placeholder=''-->
      <!--          v-model="weekly_media_title" >-->

<!--      <div class="flex-box">-->
<!--        <div class="media-upload image-upload">-->
<!--          &lt;!&ndash;        <div class="media-upload image-upload" v-on:drop.prevent="handleDrop($event)">&ndash;&gt;-->
<!--          <svg-->
<!--            width="320"-->
<!--            height="320"-->
<!--            xmlns="http://www.w3.org/2000/svg"-->
<!--            style="stroke-width:1px; stroke:#757575;"-->
<!--          >-->
<!--            <path d="M0,0 l320,320"></path>-->
<!--            <path d="m320,0 l-320,320"></path>-->
<!--          </svg>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <!--    <div v-if="weekNow === 3">-->
    <!--      <p>-->
    <!--        For this week, upload an image inspired by the reading of this week, be it a collage, sketch, stock image,-->
    <!--        or anything that came up in your mind while reading.-->
    <!--      </p>-->
    <!--      <p class="caption-top">IMAGE TITLE</p>-->
    <!--      <input-->
    <!--          :id="'weekly_media_title'+weekNow"-->
    <!--          ref="input"-->
    <!--          class="input-item"-->
    <!--          name="weekly_media_title"-->
    <!--          placeholder=''-->
    <!--          v-model="weekly_media_title" >-->

    <!--      <div class="flex-box">-->
    <!--        <div class="media-upload image-upload">-->
    <!--          <svg width="320" height="320" xmlns="http://www.w3.org/2000/svg" style="stroke-width:1px; stroke:#757575;">-->
    <!--            <path d="M0,0 l320,320"></path>-->
    <!--            <path d="m320,0 l-320,320"></path>-->
    <!--          </svg>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div v-if="weekNow === 3">
      <p>
        For this week, share one favorite quote from this week's reading.
      </p>
<!--      <textarea-->
<!--        rows="10"-->
<!--        name="fav-quote"-->
<!--        placeholder=""-->
<!--        v-model="weekly_media_text"-->
<!--      />-->
    </div>
    <div v-if="weekNow === 4">
      <p>
        For this week, send a screenshot of one annotation in your current
        reading, and your interaction with it. Do you like the annotation your
        reading mates made? Or do you have different opinions, or add anything
        to it?
      </p>
<!--      <div class="flex-box">-->
<!--        <div class="media-upload image-upload">-->
<!--          &lt;!&ndash;        <div class="media-upload image-upload" v-on:drop.prevent="handleDrop($event)">&ndash;&gt;-->
<!--          <svg-->
<!--            width="320"-->
<!--            height="320"-->
<!--            xmlns="http://www.w3.org/2000/svg"-->
<!--            style="stroke-width:1px; stroke:#757575;"-->
<!--          >-->
<!--            <path d="M0,0 l320,320"></path>-->
<!--            <path d="m320,0 l-320,320"></path>-->
<!--          </svg>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <div v-if="weekNow === 5">
      <p>
        For this week, send an audio recording of your reading environment, or
        any audio footage you took this week. Feel free to mix it with other
        sources of audio. You can use copyright-free materials online such as
        <a href="http://freesound.org" target="_blank">Freesound</a>, but make
        sure to include at least one source of sound that you recorded or made.
      </p>
      <!--      <p class="caption-top">AUDIO TITLE</p>-->
      <!--      <input-->
      <!--          :id="'weekly_media_title'+weekNow"-->
      <!--          ref="input"-->
      <!--          class="input-item"-->
      <!--          name="weekly_media_title"-->
      <!--          placeholder=''-->
      <!--          v-model="weekly_media_title" >-->
<!--      <div class="media-upload audio-upload">-->
<!--        <img src="../../assets/upload.svg" height="24px" />-->
<!--      </div>-->
    </div>
    <div v-if="weekNow === 6">
      <p>
        Congratulations on making it to the final week! For this week, add tags
        that best describe the reading that you contributed. This will be used
        as the interactive bibliography.
      </p>
    </div>

    <p style="border: None; hyphenate-character: initial">
      Send the quote directly to <a href="mailto:hi@chimera.place">hi@chimera.place</a> or click the button below.
    </p>

    <div
      v-if="weekNow !== 1"
      class="flex-box flex-box-vertical"
      style="border-top: var(--border)"
    >
<!--      <div class="link" id="media-submit" style="border-right: var(&#45;&#45;border)">-->
<!--        SUBMIT-->
<!--      </div>-->
<!--      <div class="link" id="media-delete" v-on:click="clearValues">-->
<!--        DELETE-->
<!--      </div>-->
      <div class="link" id="media-submit">
        <a href="mailto:hi@chimera.place">SUBMIT WEEKLY PROMPT</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UploadAnotatedText from "../Rooms/UploadAnotatedText.vue";

export default {
  name: "CardWeekly",
  props: {
    weekNow: Number,
    group_name: String,
    room_name: Number,
    room: Object,
    startDate: Date,
    showCard: Boolean,
  },
  components: {
    UploadAnotatedText,
  },
  data() {
    return {
      // weekly_media_title: "",
      userName: this.$cookie.get("chimera-place-auth"),
      weekly_media_text: "",
      isUploaded: false
    };
  },
  mounted() {
    // this.addDropZone();
    this.showCardWeekly();
    this.checkIsUploaded();
  },
  computed: {
    getDeadline() {
      let deadline = new Date();
      deadline.setDate(this.startDate.getDate() + 7 * this.weekNow);
      return deadline;
    },
  },
  methods: {
    hideCardWeekly() {
      this.$emit("showCard", false);
    },
    showCardWeekly() {
      this.$emit("showCard", true);
    },
    // clearValues() {
    //   document.querySelector("textarea").value = "";
    // },
    checkIsUploaded() {
      let readings_creators = this.room.readings_creators;
      const latestUploader = readings_creators[readings_creators.length - 1];

      if(latestUploader == this.userName) {
        this.isUploaded = true;
      }
    },
    // addDropZone() {
    //   const dropzone = document.querySelector('.media-upload');

    //   dropzone.addEventListener('dragenter', event => {
    //     event.preventDefault();
    //   });

    //   dropzone.addEventListener('dragleave', event => {
    //     event.preventDefault();
    //   });

    //   dropzone.addEventListener('dragover', event => {
    //     event.preventDefault();
    //   });

    //   dropzone.addEventListener('drop', event => {
    //     event.preventDefault();
    //     const file = event.dataTransfer.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.addEventListener('loadend', () => {
    //       const img = document.createElement('img');
    //       img.src = reader.result;
    //       img.style = "width: 330px; height: 333px; object-fit: cover; "
    //       let svg = dropzone.querySelector("svg");
    //       dropzone.appendChild(img);
    //       svg.remove();

    //     })
    //   });
    // },
    downloadLatestPDF() {
      axios
        .get(
          `/api/groups/downloadLatest/${this.group_name}/${this.room_name}`,
          {
            responseType: "blob",
          }
        )
        .then((response) => {
          var file = window.URL.createObjectURL(new Blob([response.data]));
          var docUrl = document.createElement("a");
          docUrl.href = file;
          docUrl.download = this.room.readings[
            this.room.readings.length - 1
          ].originalname;
          docUrl.click();
        })
        .catch((error) => {
          if (error.response && error.response.status != 200) {
            alert(error.response.data.error);
          }
        });
    },
  },
};
</script>

<style scoped>
#card-weekly {
  position: absolute;
  z-index: 10;
}

.media-upload {
  width: 320px;
  margin: 15px auto;
  top: 0;
  left: 0;
}

.image-upload {
  border: var(--border);
  padding-bottom: -1px;
}

.audio-upload {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--border-dashed);
}

.image-upload img {
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

.message {
  display: inline-flex;
  font-size: 0.8rem;
  height: 50px;
  align-items: center;
  justify-content: center;
}
</style>

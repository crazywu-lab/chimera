<template>
  <form class="card-simple" id="upload-card" @submit.prevent="uploadPdf">
    <div class="flex-box close-button-container">
      <button class="close-button" v-on:click="hideUploadCard($event)">
        <svg style=" stroke-width: 1px; stroke: black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <line x2="20" y2="20"/><line x1="20" y2="20"/>
        </svg>
      </button>
    </div>
    <p>
      <i>LENGTH</i> a reasonable page range for a weekly leisure read; we suggest no more than 40 pages. It could be from one or few sources.<br><br>
      <i>THEME</i> any topic is welcome, BUT you will benefit the most by contributing materials that you would love to see people’s response. It could be a reading that always confuses you and hence you would hope to see how people think; a reading that is related to your current research and you hope to gather more references/feedback; or just a favourite reading that influences you and you hope to share with others!<br><br>
      <i>PREPARATION</i> feel free to start annotating your materials: you can leave questions for people to respond, or put in some references that you think may help guide people’s reading… Having said, an unannotated version is fine too.<br><br>
    </p>
    <div>
      <p class="caption-top">TITLE</p>
      <input
          class="input-item"
          id="room_title"
          name="room_title"
          placeholder=''
          v-model="room_title" >
      <p class="caption-top">YEAR</p>
      <input
          class="input-item"
          id="year"
          name="year"
          placeholder=''
          v-model="year" >
      <p class="caption-top">AUTHOR</p>
      <input
          class="input-item"
          id="author"
          name="author"
          placeholder=''
          v-model="author" >
    </div>
    <span class='error-msg' v-if="error">{{ error }}</span>

    <div class="flex-box">
      <div class="pdf-upload link">
        <img src="../../assets/upload.svg" style="width:25px">
      </div>
    </div>
    <div v-if="message"
         :class="`message ${error ? 'is-danger' : 'is-success'}`">
      <div class="message-body">{{ message }}</div>
    </div>
    <div class="flex-box" style="border-top: var(--border)">
      <div class="link" style="border-right: var(--border)">
        SUBMIT
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default {
  name: "CardWeekly",
  data() {
    return {
      room_title: "",
      year: "",
      author: "",
      message: "",
      error: null,
    }
  },
  mounted(){
    this.addDropZone();
  },
  methods: {
    hideUploadCard(event){
      console.log(event);
      this.$emit("showUploadCard", false);
    },



    async uploadPdf() {
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("room_title", this.room_title);
      formData.append("year", this.year);
      formData.append("author", this.author);
      formData.append("contributor", this.userName);
      try {
        await axios.post("/api/upload/uploadPDF", formData)
            .then((response) => {
              eventBus.$emit("upload-pdf-success", {
                data: response.data
              });
            });
        this.message = "File has been uploaded";
        this.file = "";
        this.error = false;
      } catch (err) {
        this.message = err.response.data.error;
        this.error = true;
      }
    }
  }
}
</script>

<style scoped>
#upload-card{
  width: 400px;
}

.pdf-upload{
  border: var(--border-dashed);
  width: 100%;
  margin: 50px 15px 30px 15px;
  height: 150px;
  vertical-align: middle;
}

.media-upload img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin: 0;
  padding: 0;
  position: fixed;
}
.flex-box {
  padding: 0;
  margin: 0;
}

</style>

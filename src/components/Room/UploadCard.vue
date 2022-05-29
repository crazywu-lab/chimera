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
      Please upload the reading material that you wish to share below. Any
      topic is welcome, but note that you will benefit the most by
      contributing materials that you would like to see other people’s response.
      It could be a reading that baffles you and wish to see how other
      people think, a reading that is related to your research interest, or just a favorite
      reading that influences you. A reasonable page range for a weekly leisure read;
      we suggest <i>no more than 40 pages</i>.
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
      <div class="link">
        DELETE
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
  width: 330px;
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

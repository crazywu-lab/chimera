<template>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">
      <div
        v-if="message"
        :class="`message ${error ? 'is-danger' : 'is-success'}`"
      >
        <div class="message-body">{{ message }}</div>
      </div>
      <div class="field">
        <label for="file" class="label">Upload File</label>

        <input type="file" ref="file" @change="selectFile" />
      </div>

      <div v-if="file" class="field">
        <button class="button is-info">Upload</button>
      </div>
    </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default {
  name: "simpleUpload",
  props: ['room_name'],
  data() {
    return {
      file: "",
      message: "",
      error: false,
    };
  },

  methods: {
    selectFile() {
      const file = this.$refs.file.files[0];
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 10000000;
      const tooLarge = file.size > MAX_SIZE;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.file = file;
        this.error = false;
        this.message = "";
      } else {
        this.error = true;
        this.message = tooLarge
          ? `Too large. Max size is ${MAX_SIZE / 1000000} Mb.`
          : "Only pdf files are allowed.";
      }
    },

    async sendFile() {
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("room_name", this.room_name);
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
    },
  },
};
</script>

<style></style>

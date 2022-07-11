<template>
  <form enctype="multipart/form-data">
    <div
      v-if="message"
      :class="`message ${error ? 'is-danger' : 'is-success'}`"
    >
      <div class="message-body">{{ message }}</div>
    </div>
    <div class="field">
      <label for="fileUpload" class="label">UPLOAD ANNOTATED</label>

      <input id="fileUpload" type="file" ref="file" @change="selectFile" required />
    </div>

    <div v-if="file" class="field">
      <button class="button is-info" @click="sendFile">Upload</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default {
  name: "initialUpload",
  props: {
    room_name: Number,
    // roomNumber: String,
    group_name: String,
  },
  data() {
    return {
      file: "",
      message: "",
      error: false,
      userName: this.$cookie.get("chimera-place-auth"),
      isUploading: false,
    };
  },

  beforeMount() {
    window.addEventListener("beforeunload", this.preventNav);
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("beforeunload", this.preventNav);
    });
  },

  beforeRouteLeave(to, from, next) {
    if (this.isEditing) {
      if (!window.confirm("Leave without saving?")) {
        return;
      }
    }
    next();
  },

  methods: {
    preventNav(event) {
      if (!this.isEditing) return
      event.preventDefault()
      event.returnValue = ""
    },
    selectFile() {
      const file = this.$refs.file.files[0];
      console.log(file);
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 10000000;
      const tooLarge = file.size > MAX_SIZE;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.file = file;
        this.error = false;
        this.isUploading = true;
        console.log(this.isUploading);
        this.message = "";
        // this.$emit("eventname", this.roomNumber, this.file);
      } else {
        this.error = true;
        this.message = tooLarge
          ? `Too large. Max size is ${MAX_SIZE / 1000000} Mb.`
          : "Only pdf files are allowed.";
      }
    },

    async sendFile() {
      console.log(this.file);
      const formData = new FormData();
      formData.append("file", this.file);
      // formData.append("room_name", this.room_name);
      formData.append("creator", this.userName);
      try {
        await axios
          .put(
            `/api/groups/uploadAnnotatedText/${this.group_name}/${this.room_name}`,
            formData
          )
          .then((response) => {
            eventBus.$emit("upload-pdf-success", {
              data: response.data,
            });
          });
        this.message = "File has been uploaded";
        this.file = "";
        this.error = false;
        this.isUploading = false;
      } catch (err) {
        this.message = err.response.data.error;
        this.error = true;
      }
    },
  },
};
</script>

<style scoped>
  .message-body {
    font-size: 0.5rem;
  }
  input {
    display: none;
  }
</style>

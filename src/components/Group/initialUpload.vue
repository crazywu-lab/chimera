<template>
    <form enctype="multipart/form-data">
      <div
        v-if="message"
        :class="`message ${error ? 'is-danger' : 'is-success'}`"
      >
        <div class="message-body">{{ message }}</div>
      </div>
      <div class="field">
        <label for="file" class="label">Upload File</label>

        <input type="file" ref="file" @change="selectFile" required/>
      </div>

      <!-- <div v-if="file" class="field">
        <button class="button is-info">Upload</button>
      </div> -->
    </form>
</template>

<script>
// import axios from "axios";
// import { eventBus } from "../../main";

export default {
  name: "initialUpload",
  props: ['room_name', 'roomNumber'],
  data() {
    return {
      file: "",
      message: "",
      error: false,
      userName: this.$cookie.get('chimera-place-auth')
    };
  },

  methods: {
    selectFile() {
      const file = this.$refs.file.files[0];
      console.log(file);
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 10000000;
      const tooLarge = file.size > MAX_SIZE;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.file = file;
        this.error = false;
        this.message = "";
        this.$emit("eventname", this.roomNumber, this.file);
      } else {
        this.error = true;
        this.message = tooLarge
          ? `Too large. Max size is ${MAX_SIZE / 1000000} Mb.`
          : "Only pdf files are allowed.";
      }
    },
  },
};
</script>

<style></style>

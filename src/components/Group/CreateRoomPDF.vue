<template>
  <form @submit.prevent="createRoom" enctype="multipart/form-data">
    <div
      v-if="message"
      :class="`message ${error ? 'is-danger' : 'is-success'}`"
    >
      <div class="message-body">{{ message }}</div>
    </div>
    <div class="field">
      <label for="file" class="label">Create a new room with a reading.</label>

      <input type="file" ref="file" @change="selectFile" />
    </div>

    <div v-if="file" class="field">
      <button class="button is-info">Create new room</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default {
  name: "CreateRoomPDF",
  props: ["group_name"],
  data() {
    return {
      file: "",
      message: "",
      error: false,
      userName: this.$cookie.get("chimera-place-auth"),
      room: {
        room_name: "",
      },
    };
  },

  methods: {
    async createRoom() {
      axios
        .post("/api/rooms/" + this.group_name, this.room)
        .then((response) => {
          eventBus.$emit("create-room-success", {
            data: response.data,
          });
          this.$router.push("/dashboard").catch(() => {});
        })
        .catch((error) => {
          if (error.response && error.response.status != 200) {
            this.error = error.response.data.error;
          }
        });

      const formData = new FormData();
      console.log(this.room.room_name);
      formData.append("file", this.file);
      formData.append("room_name", this.room.room_name);
      formData.append("creator", this.userName);
      try {
        await axios.post("/api/upload/uploadPDF", formData).then((response) => {
          eventBus.$emit("upload-pdf-success", {
            data: response.data,
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

    selectFile() {
      const file = this.$refs.file.files[0];
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 10000000;
      const tooLarge = file.size > MAX_SIZE;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.file = file;
        this.room.room_name = file.name;
        this.error = false;
        this.message = "";
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

<template>
  <div class="pdf-card">
    PDFCard
    <div class="pdf-name">{{file.originalname}}</div>
    <div class="pdf-size">{{file.size / 1000}} Kb</div>
    <button v-on:click="deletePDF">Delete</button>
  </div>
</template>

<script>
import { eventBus } from "../../main";
import axios from "axios";

export default {
  name: "PdfCard",
  props: ["file", "roomName"],
  methods: {
    deletePDF() {
        axios.delete("/api/rooms/deletePDF/" + this.roomName + "/" + this.file.filename, {})
                .then((response) => {
                    eventBus.$emit("delete-pdf-success",{
                        data: response.data,
                    });
                })
                .catch((error) => {
                    if (error.response && error.response.status != 200){
                    alert(error.response.data.error)
                    }
                })
    }
  }
};
</script>

<style>
.pdf-card {
    display: flex;
    justify-content: space-around;
    background: grey;
    color: white;
    margin: 10px;
    padding: 20px;
}
</style>

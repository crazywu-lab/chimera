<template>
  <tr class="pdf-card">
    <!-- <b>PDFCard</b> -->
    <td class="pdf-name">{{ file.originalname }}</td>
    <td>{{file.creator_id}}</td>
    <td class="pdf-size">{{ file.size / 1000 }} Kb</td>
    <td>
      <button class="btn-delete" v-on:click="deletePDF">Delete</button>
    </td>
  </tr>
</template>

<script>
import { eventBus } from "../../main";
import axios from "axios";

export default {
  name: "PdfCard",
  props: ["file", "roomName"],
  methods: {
    deletePDF() {
      axios
        .delete(
          "/api/rooms/deletePDF/" + this.roomName + "/" + this.file.filename,
          {}
        )
        .then((response) => {
          eventBus.$emit("delete-pdf-success", {
            data: response.data,
          });
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

<style>
.pdf-card {
  display: flex;
  justify-content: space-around;
  background: grey;
  color: white;
  margin: 10px;
  padding: 20px;
}
.pdf-name {
  display: flex;
  justify-content: center;
  align-items: center;
}
.pdf-size {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-delete {
  width: 30%;
  margin: 0;
}
</style>

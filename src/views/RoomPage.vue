<template>
  <div class="room-page">
    <Navbar />
    <router-link class="router-link" to="/admin/dashboard">Home</router-link>
    <br />
    <h1>Reading Group: {{ $route.params.group_name }}</h1>
    <h2>Reading Room: {{ $route.params.room_name }}</h2>

    <br />

    <h4>Current Reader: {{ room.currentReader }}</h4>
    <!-- <div class="members-section">
        <MemberCard
          v-for="member in room.members"
          :key="member"
          :member="member"
          :room="room"
        />

        <button class="" v-on:click="ReaderBool = !ReaderBool">
          Add Reader
        </button>
        <form action="" v-show="ReaderBool" @submit.prevent="addReader">
          <select name="reader" id="reader">
            <option value="">Charles</option>
            <option value="">Queenie</option>
            <option value="">Kii</option>
            <option value="">Weihan</option>
            <option value="">Joel</option>
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div> -->

    <!-- <simpleUpload v-bind:room_name="room.room_name" /> -->
    <br />
    <table>
      <tr>
        <th>File Name</th>
        <th>Uploaded By</th>
        <th>Uploaded At</th>
        <th>File Size</th>
        <th>Delete</th>
      </tr>
      <tr v-for="(file, index) in room.readings" :key="file.filename">
        <td class="pdf-name">{{ file.originalname }}</td>
        <td>{{ room.readings_creators[index] }}</td>
        <td>placeholder</td>
        <td class="pdf-size">{{ file.size / 1000 }} Kb</td>
        <td>
          <button class="btn-delete" v-on:click="deletePDF">Delete</button>
        </td>
      </tr>
      <!-- <PdfCard
        v-for="file in room.readings"
        :key="file.filename"
        :file="file"
        :roomName="room.room_name"
      /> -->
    </table>

    <br /><br /><br />
    <button @click="downloadLatestPDF">Download Latest Reading PDF</button>
    <!-- <PdfViewer /> -->
  </div>
</template>

<script>
// import fs from "fs";
// import MemberCard from "../components/Rooms/Members/MemberCard.vue";
import Navbar from "../components/NavBar/Navbar.vue";
// import simpleUpload from "../components/Room/simpleUpload.vue";
// import PdfCard from "../components/Room/PdfCard.vue";
//import PdfViewer from '../components/Room/PdfViewer.vue';

import axios from "axios";
import { eventBus } from "@/main";
export default {
  name: "RoomPage",
  props: ["signedInUser"],
  components: {
    Navbar,
    // MemberCard,
    // simpleUpload,
    // PdfCard,
    // PdfViewer
  },
  data() {
    return {
      items: [],
      room: {},
      ReaderBool: false,
      readerList: [],
      reader: "",
    };
  },
  created() {
    eventBus.$on(
      ["delete-member-success", "upload-pdf-success", "delete-pdf-success"],
      () => {
        this.getRoom();
      }
    );
    this.getRoom();
    this.getReaders();
  },
  mounted() {
    eventBus.$on(
      ["create-item-success", "delete-item-success", "claim-item-success"],
      () => {
        this.$router.push("/").catch(() => {});
      }
    );
  },
  methods: {
    addReader() {
      axios
        .put("/api/rooms/addMember/" + this.room.room_name, this.reader)
        .then((response) => {
          this.room = response.data;
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
      this.reader = "";
    },
    getRoom() {
      axios
        .get(
          "/api/groups/getRoom/" +
            this.$route.params.group_name +
            "/" +
            this.$route.params.room_name
        )
        .then((response) => {
          console.log(response.data);
          this.room = response.data;
        })
        .catch((error) => {
          alert(error);
        });
    },
    getReaders() {
      axios
        .get("/api/users")
        .then((response) => {
          this.readerList = response.data;
        })
        .catch((error) => {
          alert(error);
        });
    },
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
    downloadLatestPDF() {
      axios
        .get(
          `/api/groups/downloadLatest/${this.$route.params.group_name}/${this.$route.params.room_name}`,
          {
            responseType: "blob",
          }
        )
        .then((response) => {
          var file = window.URL.createObjectURL(new Blob([response.data]));
          var docUrl = document.createElement('a');
          docUrl.href = file;
          docUrl.download = this.room.readings[this.room.readings.length-1].originalname;
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
.room-page {
  padding: 13.5vh;
  height: auto;
  font-family: "Montserrat", sans-serif;
}

.row-zero {
  height: 10vh;
}

.item {
  width: 100%;
  height: 25vh auto;
}

.section-title {
  width: 80%;
  height: 30px;
  padding: 10px 20px;
  border-radius: 30px;
  background: -webkit-linear-gradient(120deg, #00e5ff, #1200ff);
  box-shadow: 1px 1px 6px 0 rgba(31, 38, 135, 0.3);
  color: white;
}

.items {
  min-height: 650px;
  display: flex;
  flex: wrap;

  background: #f4f8fe;
  overflow: auto;
  overflow-wrap: anywhere;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 1px 1px 6px 0 rgba(31, 38, 135, 0.3);
}

.create-btn {
  background: #cdff61;
  color: black;
  text-decoration: none;
  margin-top: 200px;
  padding: 20px;
  border-radius: 10px;
}

.create-btn:hover {
  background: grey;
  color: white;
}
.search-col {
  padding-top: 20px;
  height: 80vh auto;
  width: 21%;
  font: 20;
  background: white;
}
.search-col input {
  border-radius: 10px;
}
.search-col p strong {
  font-size: large;
}

.search-col p input {
  margin-left: 5%;
  font-size: 20px;
}
.display-container {
  display: flex;
  justify-content: space-between;
}
.members-section {
  display: flex;
  flex: wrap;
  justify-content: flex-start;
  padding-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
}
.add-member-card {
  width: 80px;
  height: 80px;
  padding-top: 8px;
  background: grey;
  text-align: center;
  align-items: center;
  border-radius: 50px;
  cursor: pointer;
}
.add-member-card > form {
  margin-top: 20px;
  display: flex;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>

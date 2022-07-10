<template>
  <div id="home-weekly" class="full-bleed">
    <Background :y="weekNow > 2? 2 : 1"/>
<!--    <h1>Reading Group - {{group.group_name}}</h1>-->
<!--    <h1 class="current-week">-->
<!--      Week {{ group.currentWeek }}/{{ group.members_num - 1 }}-->
<!--    </h1>-->
<!--    <br />-->
<!--    <br />-->
<!--    <router-link class="link" to="/">-->
<!--      HOME-->
<!--    </router-link>-->

    <RoomCardView
      @showCard="showCardFunc($event)"
      :week-now="weekNow"
      :group_name="group.group_name"
      :room_name="room.room_name"
    />
    <MediaWeekly v-if="weekNow > 2" :week-now="weekNow" />
    <!--    <PictureFrames2/>-->
    <Footer />

    <transition name="zoom">
      <CardWeekly
        v-if="showCard"
        @showCard="showCardFunc($event)"
        :week-now="weekNow"
        :group_name="group.group_name"
        :room_name="room.room_name"
        :room="room"
        :start-date="startDate"
      />
    </transition>
    <!--    <NavToArchive />-->
    <Navbar
        :showNavDropDown="showNavDropDown"
        @showNavDropDown="showNavDropDownFunc($event)"
    />
    <transition name="zoom-topright">
      <nav-drop-down v-if = "showNavDropDown"
                     @showNavDropDown="showNavDropDownFunc($event)"
                     @showSignIn="showSignInFunc($event)"
      />
    </transition>
  </div>
</template>

<script>
import axios from "axios";
// import { eventBus } from "@/main";

import Background from "../components/Background/Background.vue";
import Navbar from "../components/NavBar/Navbar.vue";
import RoomCardView from "../components/Rooms/RoomCardView.vue";
import CardWeekly from "../components/Public/CardWeekly.vue";
import Footer from "../components/NavBar/Footer.vue";
import MediaWeekly from "../components/Public/MediaWeekly.vue";
import NavDropDown from "../components/NavBar/NavDropDown.vue";

export default {
  name: "HomeWeekly",
  data() {
    return {
      userName: this.$cookie.get("chimera-place-auth"),
      showCard: false,
      showNavDropDown: false,
      weekNow: 5,
      startDate: new Date(2022, 6, 11),
      group: {},
      room: {},
    };
  },
  created() {
    // this.getGroupByUser();
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.showCard = false;
      }
    });
  },
  components: {
    MediaWeekly,
    // PictureFrames2,
    RoomCardView,
    Navbar,
    // NavToArchive,
    Footer,
    Background,
    CardWeekly,
    NavDropDown,
  },
  mounted() {
    this.getGroupByUser();
    this.getRoomByUser();
  },
  methods: {
    showCardFunc(showCard) {
      this.showCard = showCard;
    },
    showNavDropDownFunc(bool) {
      this.showNavDropDown = bool;
    },
    getGroupByUser() {
      axios
        .get(
          "/api/groups/getGroupByUser/" + this.$cookie.get("chimera-place-auth")
        )
        .then((response) => {
          this.group = response.data;
          this.weekNow = response.data.currentWeek;
          console.log(this.weekNow);
        })
        .catch((error) => {
          alert(error);
        });
    },
    getRoomByUser() {
      axios
        .get(
          "/api/groups/getRoomByUser/" + this.$cookie.get("chimera-place-auth")
        )
        .then((response) => {
          this.room = response.data;
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>
<style scoped>
.link {
  width: 50%;
  border-top: var(--border);
  cursor: pointer;
  z-index: 10;
}
</style>

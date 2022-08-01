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
      :show_card ="showCard"
      :weekNow="weekNow"
      :user_name="userName"
    />
    <MediaWeekly v-if="weekNow > 2" :week-now="weekNow" ref="media"/>
    <Footer />
    <div id="nav-to-media" v-if="weekNow > 2" @click="scrollDown">
      <div>
        LAST WEEK FROM YOUR GROUP
      </div>
      <div class="arrow-container" >
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(90deg);">
          <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/>
        </svg>
      </div>
    </div>
    <transition name="zoom">
      <CardWeekly
        v-if="showCard"
        @showCard="showCardFunc($event)"
        :weekNow="weekNow"
        :group_name="group.group_name"
        :room_name="room.room_name"
        :room="room"
        :start-date="startDate"
      />
    </transition>
    <Navbar />
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main.js";

import Background from "../components/Background/Background.vue";
import Navbar from "../components/NavBar/Navbar.vue";
import RoomCardView from "../components/Rooms/RoomCardView.vue";
import CardWeekly from "../components/Public/CardWeekly.vue";
import Footer from "../components/NavBar/Footer.vue";
import MediaWeekly from "../components/Public/MediaWeekly.vue";

export default {
  name: "HomeWeekly",
  data() {
    return {
      userName: this.$cookie.get("chimera-place-auth"),
      showCard: false,
      weekNow: 3,
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
    eventBus.$on("signout-success", () => {
      this.userName = "";
      this.$router.push("/").catch(() => {});
    })
  },
  components: {
    MediaWeekly,
    RoomCardView,
    Navbar,
    Footer,
    Background,
    CardWeekly,
  },
  mounted() {
    this.getGroupByUser();
    this.getRoomByUser();
  },
  methods: {
    showCardFunc(showCard) {
      this.showCard = showCard;
    },
    scrollDown() {
      const el = this.$el.querySelector('#media-weekly');
      console.log(el);
      el.scrollIntoView({behavior: 'smooth'});
    },
    getGroupByUser() {
      axios
        .get(
          "/api/groups/getGroupByUser/" + this.$cookie.get("chimera-place-auth")
        )
        .then((response) => {
          this.group = response.data;
          this.weekNow = response.data.currentWeek;
          console.log("on week", this.weekNow);
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

#nav-to-media {
  display: inline-flex;
  flex-direction: column;
  text-align: center;
  bottom: 5px;
  left: 50vw;
  position: absolute;
  transform: translateX(-50%);
  font-size: 0.8rem;
  cursor: pointer;
}

.arrow-container {
  margin: 0 auto;
}
svg {
  width: 40px;
  height: 100%;
  margin: 5px 19px 0 auto;
}

.arrow-container :hover{
  animation: arrow-down 1s ease-in-out infinite;
}

@keyframes arrow-down {
  0%,
  100% {
    transform: translate(0, 0) rotate(90deg);
  }
  50% {
    transform: translate(0, 5px) rotate(90deg);
  }
}

</style>

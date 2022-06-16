<template>
<div class="room-container">
    <div class="row justify-content-center title-div">
        <div class="col-12 title-col">
            <h2 id="title">Reading Rooms</h2>
        </div>
    </div>
    <div class="row justify-content-center content-div">
        <div class="rooms-grid">
            <RoomCard v-for="room in rooms" :key="room._id" :room="room" />
            <!-- <AddCard /> -->
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
// import { eventBus } from "../../main";
import RoomCard from "./RoomCard.vue";
// import AddCard from "./AddCard.vue";

export default {
    name: "ListRooms",
    components: {
        RoomCard,
        // AddCard,
    },
    props: {
        rooms: {
            type: Array,
            required: true,
        }
    },
    // data() {
    //     return {
    //         rooms: [],
    //     };
    // },
    created() {
        // this.getRooms();
        // eventBus.$on(["create-room-success", "delete-room-success"], () => {
        //     this.getRooms();
        // });
    },
    methods: {
        getRooms() {
            axios
                .get("/api/rooms/all")
                .then((response) => {
                    this.rooms = response.data;
                })
                .catch((error) => {
                    alert(error);
                });
        },
    },
};
</script>

<style>
.room-container {
    font-family: "Montserrat", sans-serif;
    margin-top: 5vh;
    padding: 0 30px;
    width: 90%;
}
/* .title-div{
    margin: 0 2vw;
    border-bottom: 2px solid black;
} */
.content-div{
   margin-top: 1vh;
}
.col-12 {
    padding: 0;
}
#title {
    font-size: 1.5rem;
    font-weight: 700;
}
.empty-placeholder {
    margin: 4vh 2vw;
    font-size: 1.5rem;
}
.rooms-grid {
    display: flex;
    flex-wrap: wrap;
    padding: 6vh 3vw;
    min-height: 30vh;
    background: none;
}
</style>

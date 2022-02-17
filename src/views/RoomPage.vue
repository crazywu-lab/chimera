<template>
<div class="room-page">
    <Navbar />
    <router-link class="router-link" to="/">Home</router-link>
    <br>
    <br>
    <!-- <div v-if="signedInUser"> -->
    <h2> Reading Room Name: {{ this.$route.params.room.room_name }}</h2>

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div>
        <h4>Members</h4>
        <div class="members-list">
            <MemberCard v-for="member in room.members" :key="member" :member="member" :room="room"/>
            <div class="add-member-card" >
                <i class="fa fa-plus room-plus" v-on:click="addFriend=!addFriend"></i>

                <form action="" v-show="addFriend" @submit.prevent="addMember">
                    <input type="text" id="newmember" placeholder="username" v-model="newMembers.newmember" required>
                    <input type="submit" value="Add Member">
                </form>
            </div>
        </div>
    </div>
    <simpleUpload v-bind:room_name="this.$route.params.room.room_name"/>
    <br>
    <pdfCard v-for="file in room.readings" :key="file.filename" :file="file" />
    <!-- <PdfViewer /> -->
</div>
</template>

<script>
// import Item from "@/components/item/Item.vue";
import MemberCard from "../components/Rooms/Members/MemberCard.vue";
import Navbar from '../components/NavBar/Navbar.vue';
import simpleUpload from '../components/Room/simpleUpload.vue';
import pdfCard from '../components/Room/pdfCard.vue';
//import PdfViewer from '../components/Room/PdfViewer.vue';

import axios from "axios";
import {
    eventBus
} from "@/main";
export default {
    name: "RoomPage",
    props: ["signedInUser", "response"],
    components: {
        Navbar,
        MemberCard,
        // HostMemberCard,
        simpleUpload,
        pdfCard,
        // PdfViewer
    },
    data() {
        return {
            items: [],
            room: this.$route.params.room,
            addFriend: false,
            newMembers: {
                newmember: ""
            }
        };
    },
    created() {
        eventBus.$on(["delete-member-success"], () => {
            this.getRoom();
        });
        this.getRoom();
    },
    mounted() {
        eventBus.$on(
            ["create-item-success",
              "delete-item-success",
              "claim-item-success",
              "upload-pdf-success"
            ],
            () => {
              this.$router.go()
            }
        )
    },
    methods: {
        addMember() {
            axios
                .put("/api/rooms/addMember/" + this.room.room_name, this.newMembers)
                .then((response) => {
                    this.room = response.data;
                })
                .catch((error) => {
                    alert(error.response.data.error);
                });
            this.newMembers.newmember = '';
        },
        getRoom(){
            this.room = this.$route.params.room;
        }
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

.item-col {
    display: flex;
    justify-content: flex-start;
    height: 80vh auto;
    background: transparent;
    padding: 20px;
    width: 80%;
    background: white;
    margin: 0 20px;
    /* display: grid;
    align-items: center;
    flex-direction: column; */
    
    
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
.search-col{
    padding-top: 20px;
    height: 80vh auto;
    width: 21%;
    font: 20;
    background: white;
}
.search-col input{
    border-radius: 10px;
}
.search-col p strong{
    font-size: large;
    
}

.search-col p input{
    margin-left:5%;
    font-size: 20px;
}
.display-container{
    display: flex;
    justify-content: space-between;
    
}
.members-list {
    display: flex;
    flex: wrap;
    justify-content: flex-start;
    padding-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    height: 100%;
    background: white;
    border: black 3px dashed;
}
.add-member-card{
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

</style>

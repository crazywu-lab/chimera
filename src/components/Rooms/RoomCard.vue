<template>
  <div class="room-card">
    <router-link :to="{name: 'room', params: {room: room, name: room.room_name}}" class="f-subcard"  >
        <p>Reading Room</p>
        <h2>{{room.room_name}}</h2>
        <p>Creator: {{ room.creator_id }}</p>
    </router-link>
    <button v-on:click="DeleteRoom" class="del-room-btn" >
            Delete
    </button>
  </div>

      
  
</template>

<script>
import { eventBus } from "../../main";
import axios from "axios";

export default {
    name: "RoomCard",
    props: {
        room: {
            type: Object,
            required: true,
        }
    },
    data() {
        return{}
    },
    methods:{
        DeleteRoom(){
            axios.delete("/api/rooms/" + this.room.room_name)
                .then((response) => {
                    eventBus.$emit("delete-room-success",{
                        data: response.data,
                    });
                })
                .catch((error) => {
                    if (error.response && error.response.status != 200){
                    alert(error.response.data.error)
                    }
                })
            
        },
    }
}
</script>

<style>
.room-card {
    width: 30%;
    margin: 10px;
}
.f-subcard {
    width: 100%;
    height: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: black;
    background-color: white;
    border-radius: 10px;
    box-shadow: 1px 1px 6px 0 rgba(31, 38, 135, 0.3);
}
.del-room-btn{
    margin-top: -60px;
    background: #f6652c;
    color: white;
    border: none;
    border-radius: 5px;
    box-shadow: 1px 1px 6px 0 rgba(31, 38, 135, 0.3);
    cursor: pointer;
}
</style>
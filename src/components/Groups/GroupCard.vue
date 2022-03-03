<template>
  <div class="group-card-container">
    <router-link class="group-card" to="/group">
      Go to group
      <h2>{{group.group_name}}</h2>
      <p>Creator: {{group.creator_id}}</p>
    </router-link>
    <div class="del-room-btn" v-on:click="DeleteGroup">Delete</div>
  </div>
</template>

<script>
import { eventBus } from "../../main";
import axios from "axios";

export default {
  name: "GroupCard",
  props: {
    group: {
      type: Object,
      required: true,
    }
  },
  components: {},
  methods:{
        DeleteGroup(){
            axios.delete("/api/groups/" + this.group.group_name)
                .then((response) => {
                    eventBus.$emit("delete-group-success",{
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
};
</script>

<style scoped>
.group-card-container{
  margin-bottom: 20px;
  position: relative;
}
.group-card {
  width: 80%;
  height: 20vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 6px 0 rgba(31, 38, 135, 0.3);
  font-size: 4rem;
}
.del-room-btn {
  position: absolute;
  top: calc(20vh - 20px);
  left: calc(90% - 50px);
  width: 100px;
  font-size: 2rem;
  background: #f6652c;
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 6px 0 rgba(31, 38, 135, 0.3);
  cursor: pointer;
}
</style>

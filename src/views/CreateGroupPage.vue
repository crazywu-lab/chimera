<template>
  <div class="create-group">
    <div class="row justify-content-left">
      <div class="col-3 title-col">
        <h2 id="title">Create a new group!</h2>
      </div>
      <div class="col-3 title-div title-left">
        <router-link class="router-link cancel-btn" to="/admin/dashboard"
          >Cancel</router-link
        >
      </div>
    </div>

    <form @submit.prevent="createGroup">
      <h4>Group Name</h4>
      <input
        type="text"
        id="group_name"
        v-model="group.group_name"
        placeholder="untitled"
        required
      />
      <label for="members">No. of members: </label>
      <select id="members_num" v-model="group.members_num" placeholder="5">
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>

      <div>
        <PickMemberList
          :group_name="group.group_name"
          :memberNum="group.members_num"
          @gatherMembers="handleChosenMember"
          @gatherFiles="handleChosenFile"
        />
      </div>

      <h4>{{ error }}</h4>
      <br />
      <br />
      <br />
      <br />
      <input class="button" type="submit" value="Create!" />
    </form>
  </div>
</template>

<script>
import { eventBus } from "../main";
import axios from "axios";
import PickMemberList from "../components/Group/pickMemberList.vue";

export default {
  name: "CreateGroupPage",
  components: { PickMemberList },
  data() {
    return {
      error: null,
      group: {
        group_name: "",
        members_num: "5",
        members: {},
        files: {},
      },
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    createGroup() {
      axios
        .post("/api/groups/create", this.group)
        .then((response) => {
          eventBus.$emit("create-group-success", {
            data: response.data,
          });
          this.$router.push("/admin/dashboard").catch(() => {});
        })
        .catch((error) => {
          if (error.response && error.response.status != 200) {
            this.error = error.response.data.error;
          }
        });
    },
    handleChosenMember(members) {
      this.group.members = members;
    },
    handleChosenFile(files) {
      this.group.files = files;
    }
  },
};
</script>

<style scoped>
.create-group {
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 6vh 3vw;
  font-family: "Montserrat", sans-serif;
}
.button {
  background: black;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 20px;
  border-radius: 10px;
  /* box-shadow: 1px 1px 6px 0 rgba(31, 38, 135, 0.3); */
}
.button:hover {
  background: grey;
  cursor: pointer;
}
</style>

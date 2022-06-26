<template>
  <div>
    <div class="" v-for="(n, index) in buildArray" :key="index">
      <pickMember @eventname="chooseMemberForRooms" :roomNumber="index" />
      <initialUpload @eventname="chooseFileForRooms" :roomNumber="index" />
    </div>
  </div>
</template>

<script>
import pickMember from "./pickMember.vue";
import initialUpload from "../Group/initialUpload.vue";
export default {
  components: {
    pickMember,
    initialUpload,
  },
  props: {
    memberNum: {
      type: String,
      required: true,
    },
    group_name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      members: {},
      files: {},
    };
  },
  computed: {
    buildArray() {
      return new Array(parseInt(this.memberNum));
    },
  },
  methods: {
    chooseMemberForRooms(roomIndex, member) {
      this.members[roomIndex] = member;
      this.$emit("gatherMembers", this.members);
    },
    chooseFileForRooms(roomIndex, file) {
      this.files[roomIndex] = file;
      this.$emit("gatherFiles", this.files);
    }
  },
};
</script>

<style></style>

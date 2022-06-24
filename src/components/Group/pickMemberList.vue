<template>
  <div>
    <pickMember
      @eventname="chooseMemberForRooms"
      v-for="(n, index) in buildArray"
      :key="index"
      :roomNumber="index"
    />
  </div>
</template>

<script>
import pickMember from "./pickMember.vue";
export default {
  components: {
    pickMember,
  },
  props: {
    memberNum: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      members: {},
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
    },
  },
};
</script>

<style></style>

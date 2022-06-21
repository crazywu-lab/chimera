<template>
  <div>
    <div v-for="n in buildArray" :key="n">
      <pickMember />
    </div>
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
  computed: {
    buildArray(){
      return new Array(parseInt(this.memberNum));
    }
  }
};
</script>

<style></style>

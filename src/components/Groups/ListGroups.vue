<template>
<div class="">
    <h1>List Groups</h1>
    <GroupCard />
</div>
  
</template>

<script>
import GroupCard from './GroupCard.vue';

export default {
    name: "ListGroups",
    components: {
        GroupCard
    },
    props: {

    }
}
</script>

<style>

</style>
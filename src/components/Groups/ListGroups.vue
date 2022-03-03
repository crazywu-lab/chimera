<template>
<div class="list-groups">
    <h1>List Groups</h1>
    <GroupCard />
    <GroupCard />
    <GroupCard />
    <CreateGroupCard />
</div>
  
</template>

<script>
import GroupCard from './GroupCard.vue';
import CreateGroupCard from './CreateGroupCard.vue';

export default {
    name: "ListGroups",
    components: {
        GroupCard, CreateGroupCard
    },
    props: {

    }
}
</script>

<style>
.list-groups{
    margin: auto;
}
</style>
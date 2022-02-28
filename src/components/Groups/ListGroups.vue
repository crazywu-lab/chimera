<template>
<div class="">
    <h1>List Groups</h1>
    <ListRooms />
</div>
  
</template>

<script>
import ListRooms from '../Rooms/ListRooms.vue';

export default {
    name: "ListGroups",
    components: {
        ListRooms
    },
    props: {

    }
}
</script>

<style>

</style>
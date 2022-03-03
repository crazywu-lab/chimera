<template>
<div class="list-groups">
    <h1>List Groups</h1>
    <GroupCard v-for="group in groups" :key="group._id" :group="group" />
    <CreateGroupCard />
</div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";
import GroupCard from './GroupCard.vue';
import CreateGroupCard from './CreateGroupCard.vue';

export default {
    name: "ListGroups",
    components: {
        GroupCard, CreateGroupCard
    },
    props: {

    },
    data() {
        return {
            groups: [],
        };
    },
    created() {
        this.getGroups();
        eventBus.$on(["create-group-success", "delete-group-success"], () => {
            this.getGroups();
        });
    },
    methods: {
        getGroups() {
            axios
                .get("/api/groups/all")
                .then((response) => {
                    this.groups = response.data;
                })
                .catch((error) => {
                    alert(error);
                });
        },
    },
}
</script>

<style>
.list-groups{
    margin: auto;
}
</style>
import Vue from "vue";
import VueRouter from "vue-router";
import VueCookie from "vue-cookie";

// import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App.vue";
import Home from "./views/Home.vue";
import Dashboard from "./views/Dashboard.vue";
import Settings from "./views/Settings.vue";
import CreateRoom from "./views/CreateRoomPage.vue";
import RoomPage from './views/RoomPage.vue';
import HomePublic from './views/HomePublic.vue';
import HomeWeekly from "./views/HomeWeekly.vue";
import GroupPage from './views/GroupPage.vue';
import CreateGroupPage from './views/CreateGroupPage.vue';
import ErrorPage from './views/ErrorPage.vue';
import SignUp from "./components/Users/SignUpForm.vue";
// import Archive from "./views/Archive.vue";

export const eventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueCookie);


export const router = new VueRouter({
  routes: [
    { path: "/", component: HomePublic, props: true },
    { path: "/0", component: HomeWeekly, props: true },
    { path: "/admin/signup", component: SignUp, props: true },
    { path: "/admin/dashboard", component: Dashboard, props: true },
    { path: "/admin/settings", component: Settings, props: true },
    { path: "/admin/createRoom", component: CreateRoom, props: true},
    { path: '/admin/group/:group_name/:room_name', name: 'room', component: RoomPage, props: true },
    { path: '/admin/signin', name: 'public', component: Home, props: true },
    { path: '/admin/group/:name', name: 'group', component: GroupPage, props: true },
    { path: "/admin/createGroup", component: CreateGroupPage, props: true},
    // { path: "/archive", component: Archive, props: true},
    { path: "/*", component: ErrorPage, props: true},
  ]
});

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});

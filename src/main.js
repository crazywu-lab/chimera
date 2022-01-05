import Vue from "vue";
import VueRouter from "vue-router";
import VueCookie from "vue-cookie";

import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App.vue";
import Home from "./views/Home.vue";
import Rooms from "./views/Rooms.vue";
import SignIn from "./views/SignIn.vue";
import SignUp from "./views/SignUp.vue";
import Settings from "./views/Settings.vue";
import Profile from "./views/Profile.vue";
import CreateRoom from "./views/CreateRoomPage.vue";
import RoomPage from './views/RoomPage.vue';

export const eventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueCookie);

export const router = new VueRouter({
  routes: [
    { path: "/", component: Home, props: true },
    { path: "/rooms", component: Rooms, props: true },
    { path: "/signin", component: SignIn, props: true },
    { path: "/signup", component: SignUp, props: true },
    { path: "/settings", component: Settings, props: true },
    { path: "/profile", component: Profile, props: true},
    { path: "/createRoom", component: CreateRoom, props: true},
    { path: '/room/:name', name: 'room', component: RoomPage, props: true },
  ],
});

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});

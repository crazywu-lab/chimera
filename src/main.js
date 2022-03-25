import Vue from "vue";
import VueRouter from "vue-router";
import VueCookie from "vue-cookie";

// import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App.vue";
import Home from "./views/Home.vue";
import Dashboard from "./views/Dashboard.vue";
import SignIn from "./views/SignIn.vue";
import SignUp from "./views/SignUp.vue";
import Settings from "./views/Settings.vue";
import CreateRoom from "./views/CreateRoomPage.vue";
import RoomPage from './views/RoomPage.vue';
import HomePublic from './views/HomePublic.vue';
import GroupPage from './views/GroupPage.vue';
import CreateGroupPage from './views/CreateGroupPage.vue';
import ErrorPage from './views/ErrorPage.vue';

export const eventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueCookie);

export const router = new VueRouter({
  routes: [
    { path: "/", component: HomePublic, props: true },
    { path: "/dashboard", component: Dashboard, props: true },
    { path: "/signin", component: SignIn, props: true },
    { path: "/signup", component: SignUp, props: true },
    { path: "/settings", component: Settings, props: true },
    { path: "/createRoom", component: CreateRoom, props: true},
    { path: '/room/:name', name: 'room', component: RoomPage, props: true },
    { path: '/homeadmin', name: 'public', component: Home, props: true },
    { path: '/group/:name', name: 'group', component: GroupPage, props: true },
    { path: "/createGroup", component: CreateGroupPage, props: true},
    { path: "/*", component: ErrorPage, props: true},
  ]
});

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});

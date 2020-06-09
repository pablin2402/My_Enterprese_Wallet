import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CustomAccount from "../views/CustomAccount.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/CustomAccount",
    name: "CustomAccount",
    component: CustomAccount
  }
];

const router = new VueRouter({
  routes
});

export default router;

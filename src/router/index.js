import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CustomAccount from "../views/CustomAccount.vue";
import Account from "../views/Account.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/account/:id",
    name: "Account",
    component: Account
  },
  {
    path: "/customAccount",
    name: "CustomAccount",
    component: CustomAccount
  }
];

const router = new VueRouter({
  routes
});

export default router;

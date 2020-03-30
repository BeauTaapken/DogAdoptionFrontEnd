import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Home from "@/views/Home.vue";
import AddAdvert from "@/views/AddAdvert.vue";
import Advert from "@/views/Advert.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/addAdvert",
    name: "AddAdvert",
    component: AddAdvert
  },
  {
    path: "/Advert/:advertId",
    name: "Advert",
    component: Advert,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

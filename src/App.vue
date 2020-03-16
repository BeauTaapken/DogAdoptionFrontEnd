<template>
  <v-app>
    <v-content>
      <Navbar v-if="user"/>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "./components/Navbar.vue";
import * as firebase from "firebase";
import router from "./router";
import store from "./store/index";

export default Vue.extend({
  name: "App",

  components: {
    Navbar
  },

  // data() {
  //   return {
  //     user: "" as any
  //   };
  // },

  data: () => ({
    user: null as any
  }),
  mounted(): void {
    console.log("getting new onauth")
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        store.commit("setUser", user);
        this.user = store.getters.getUser;
      } else {
        router.push({ name: "Login" });
      }
    });
    // this.user = store.getters.getUser;
    // if(this.user === null){
    //   router.push({ name: "Login" });
    // }
  },
  watch: {
    $route() {
      console.log("getting new onauth")
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
          store.commit("setUser", user);
          this.user = store.getters.getUser;
        } else {
          router.push({ name: "Login" });
        }
      });
      // store.commit("setUser", firebase.auth().currentUser);
      // this.user = store.getters.getUser;
      // console.log(firebase.auth().currentUser);
      // if(this.user === null){
      //   router.push({ name: "Login" });
      // }
    }
  }
});
</script>

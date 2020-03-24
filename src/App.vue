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
import store from "./store/persistStore";

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
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        store.dispatch("setUser", user);
        this.user = store.getters.getUser;
        // router.push({ name: "Home" });
      } else {
        router.push({ name: "Login" });
      }
    });
  },
  watch: {
    $route() {
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
          store.dispatch("setUser", user);
          this.user = store.getters.getUser;
          // router.push({ name: "Home" });
        } else {
          router.push({ name: "Login" });
        }
      });
    }
  }
});
</script>

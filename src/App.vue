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
import index from "./store/index";

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
    user: "" as any
  }),
  mounted(): void {
    this.user = firebase.auth().currentUser;
    if(this.user === null){
      router.push({ name: "Login" });
    }
  },
  watch: {
    $route() {
      this.user = firebase.auth().currentUser;
      if(this.user === null){
        router.push({ name: "Login" });
      }
    }
  }
});
</script>

<template>
  <v-app-bar app v-if="username != null">
    <v-toolbar-items>
      <v-btn to="/Home" text>Home</v-btn>
      <v-btn to="/addAdvert" text>Add an advert</v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-title>{{ username }}</v-toolbar-title>

    <v-btn @click="logout" icon aria-label="Logout">
      <i class="fas fa-power-off"></i>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import * as firebase from "firebase";
import router from "@/router";

export default Vue.extend({
  name: "Navbar",
  data: () => ({
    username: null as string | null
  }),
  mounted(): void {
    this.username = this.$store.getters.getUser.displayName;
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.username = null;
          this.$store.dispatch("resetValues");
          window.sessionStorage.clear();
          router.push({ name: "Login" });
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  },
  watch: {
    $route() {
      this.username = this.$store.getters.getUser.displayName;
    }
  }
});
</script>

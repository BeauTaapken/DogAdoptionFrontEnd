<template>
  <v-app-bar app>
    <v-toolbar-items>
      <v-btn to="/Home" text>Home</v-btn>
      <v-btn to="/addAdvert" text>Add an advert</v-btn>
      <v-btn to="/textchat" text>Textchat</v-btn>
      <v-btn to="/searchfriends" text>Search friends</v-btn>
      <v-btn to="/webcamchat" text>Videochat</v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-title>{{ username }}</v-toolbar-title>

    <template v-if="$vuetify.breakpoint.smAndUp">
      <v-btn @click="logout" icon>
        <i class="fas fa-power-off"></i>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../store/persistStore";
import * as firebase from "firebase";
import router from "@/router";

export default Vue.extend({
  name: "Navbar",
  data: () => ({
    username: "" as any
  }),
  mounted(): void {
    this.username = store.getters.getUser.displayName;
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          sessionStorage.clear();
          store.commit("setUser", null);
          router.push({ name: "Login" })
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  }
});
</script>

<style scoped>
  .background {
    background-image: url("../assets/paw.png");
  }
</style>

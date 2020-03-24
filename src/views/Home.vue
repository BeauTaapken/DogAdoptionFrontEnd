<template>
  <v-container>
    <h1>Welcome to DogAdopt {{ user.displayName }}</h1>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import store from "../store/index";

export default Vue.extend({
  name: "Home" as string,
  data: function() {
    return {
      user: "" as any
    };
  },
  mounted(): void {
    this.user = store.getters.getUser;
    console.log(this.user)
  },
  methods: {
    
  }
});
</script>

<style scoped></style>

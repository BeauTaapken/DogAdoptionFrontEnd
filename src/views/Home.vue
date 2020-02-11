<template>
  <h1>Welcome to DogAdopt {{user.displayName}}</h1>
</template>

<script lang="ts">
import firebase from "firebase";
import Vue from "vue";

export default Vue.extend({
  name: "Home" as string,
  data: function() {
    return {
      user: "",
    }
  },
  mounted(): void {
    this.user = firebase.auth().currentUser;
  }
});
</script>

<style scoped></style>

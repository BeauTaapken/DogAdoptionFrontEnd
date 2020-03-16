<template>
  <v-container>
    <h1>Welcome to DogAdopt {{ user.displayName }}</h1>
    <v-btn @click="addAdvert">testing</v-btn>
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
    addAdvert() {
      this.user = store.getters.getUser;
      this.user
        .getIdToken(/* forceRefresh */ true)
        .then((idToken: string) => {
          console.log(idToken);
          axios
            .post(
              "/advert/addadvert",
              {
                UUID: {
                  UUID: this.user.uid,
                  Username: this.user.displayName
                },
                img: "t",
                title: "now it has a title",
                description: "description as well",
                breed: 1,
                age: 15
              },
              {
                headers: {
                  id: idToken
                }
              }
            )
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch((error: any) => {
          // Handle error
          console.log(error);
        });
    }
  }
});
</script>

<style scoped></style>

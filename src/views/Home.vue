<template>
  <v-container>
    <h1>Welcome to DogAdopt {{ user.displayName }}</h1>
    <infinite-loading @infinite="infiniteHandler"> </infinite-loading>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import store from "../store/persistStore";
import noPersistStore from "@/store/noPersistStore";
import InfiniteLoading from "vue-infinite-loading";

export default Vue.extend({
  name: "Home" as string,
  data: function() {
    return {
      user: "" as any,
      page: 0 as number,
      size: 10 as number
    };
  },
  components: {
    InfiniteLoading
  },
  mounted(): void {
    this.user = store.getters.getUser;
    console.log(this.user);
  },
  methods: {
    infiniteHandler: function($state: any) {
      try {
        axios
          .get("/advert/getadverts?page=" + this.page + "&size=" + this.size)
          .then(response => {
            noPersistStore.dispatch("setAdverts", response.data);
            $state.loaded();
            if (response.data.length <= 0) {
              console.log(noPersistStore.getters.getAdverts)
              $state.complete();
            }
          });
        this.page++;
      } catch (e) {
        console.log(e);
      }
    }
  },
  beforeDestroy(): void {
    noPersistStore.dispatch("resetAdverts");
  }
});
</script>

<style scoped></style>

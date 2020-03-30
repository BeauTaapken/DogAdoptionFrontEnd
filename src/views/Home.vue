<template>
  <v-container>
    <h1 class="text-center">Welcome to DogAdopt {{ user.displayName }}</h1>
    <div ref="advertLocation">
      <Advert
        v-for="advert in this.getAdvert()"
        :key="advert.advertId"
        :data="advert"
      />
    </div>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import store from "../store/persistStore";
import noPersistStore from "@/store/noPersistStore";
import InfiniteLoading from "vue-infinite-loading";
import advert from "../components/AdvertPreview.vue";

const Advert = Vue.extend(advert);

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
    Advert,
    InfiniteLoading
  },
  mounted(): void {
    this.user = store.getters.getUser;
    console.log(this.user);
  },
  methods: {
    infiniteHandler: function($state: any) {
      const advertLocation = this.$refs.advertLocation;
      try {
        axios
          .get("/advert/getadverts?page=" + this.page + "&size=" + this.size)
          .then(response => {
            const data = response.data;
            noPersistStore.dispatch("setAdverts", data);
            $state.loaded();
            if (response.data.length <= 0) {
              console.log(noPersistStore.getters.getAdverts);
              $state.complete();
            }
          });
        this.page++;
      } catch (e) {
        console.log(e);
      }
    },
    getAdvert() {
      return noPersistStore.getters.getAdverts;
    }
  },

  beforeDestroy(): void {
    noPersistStore.dispatch("resetAdverts");
  }
});
</script>

<style scoped></style>

<template>
  <v-container fluid fill-height class="ma-7">
    <v-layout justify-center>
      <v-flex xs12 sm8 md6>
        <v-row>
          <v-col cols="8">
            <v-carousel
              class="rounded"
              cycle
              height="400"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <!--          <v-carousel-item v-for="(image, i) in advert.img" :key="i" v-bind:src="image">-->
              <v-carousel-item v-bind:src="advert.img"> </v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col cols="4">

          </v-col>
        </v-row>
        <v-row>
          <h2>
            {{ advert.title }}
          </h2>
        </v-row>
        <v-row>
          <h3>
            {{ advert.description }}
          </h3>
        </v-row>
        <v-row>
          Breed: {{ advert.age }} <br />
          Age: {{ advert.breed }}
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store/persistStore";

export default Vue.extend({
  name: "Advert",
  props: {
    advertId: {
      required: true
    }
  },
  data: function() {
    return {
      advert: null as any,
      user: null as any
    };
  },
  created(): void {
    this.advert = store.getters.getAdvert(this.advertId);
    console.log(this.advert);
  },
  mounted(): void {
    this.user = store.getters.getUser;
    //TODO get advert based data like bids with api call
  },
  methods: {}
});
</script>

<style scoped>
.rounded {
  border-radius: 10px;
}
</style>

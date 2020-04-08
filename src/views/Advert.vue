<template>
  <v-container fluid fill-height>
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
              <v-carousel-item v-bind:src="advert.img"/>
            </v-carousel>
          </v-col>
          <v-col cols="4">
            <v-card height="400" class="mx-auto card" max-width="700" outlined>
              <MglMap :accessToken="accessToken" :mapStyle="mapStyle" heigt="200" @load="onMapLoaded"/>
              <v-card-title>Location:</v-card-title>
              <v-card-text>{{ advert.place }}</v-card-text>
              <v-card-title>User:</v-card-title>
              <v-card-text>{{ advertUser }}</v-card-text>
              <v-card-actions>
                <v-btn v-if="isSameUser" @click="UpdateAdvert" class="primary">Update advert</v-btn>
                <v-btn v-if="isSameUser" @click="DeleteAdvert" class="primary">Delete advert</v-btn>
                <v-btn v-if="!isSameUser">Mail owner of dog</v-btn>
              </v-card-actions>
            </v-card>
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
          <v-card-title>Breed:</v-card-title>
          <v-card-text>{{ advert.breed }}</v-card-text>

          <v-card-title>Age:</v-card-title>
          <v-card-text>{{ advert.age }}</v-card-text>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store/persistStore";
import Mapbox, {Marker} from "mapbox-gl";
import { MglMap } from "vue-mapbox";
import axios from "axios";
import {isSameRoute} from "vue-router/src/util/route";

export default Vue.extend({
  name: "Advert",
  props: {
    advertId: {
      required: true
    }
  },
  components: {
    MglMap
  },
  data: function() {
    return {
      advert: null as any,
      user: null as any,
      advertUser: "" as string,
      accessToken: "pk.eyJ1IjoiYmVhdXRhYXBrZW4iLCJhIjoiY2s4bzYzODdlMHZxODNvbzJmN3NkajFvNiJ9.O-fXCB7kq00f3Znp68y9rQ",
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      mapbox: null as any,
      isSameUser: false as boolean
    };
  },
  created(): void {
    this.advert = store.getters.getAdvert(this.advertId);
    this.mapbox = Mapbox;
    console.log(this.advert)


  },
  mounted(): void {
    this.user = store.getters.getUser;
    //TODO get advert based data like bids with api call

    axios
    .get("user/getuser/" + this.advert.UUID.UUID)
    .then(response => {
      this.advertUser = response.data;
      this.isSameUser = this.user.uid === this.advert.UUID.UUID;
    })
    .catch(error => {
      console.log(error)
    });
  },
  methods: {
    onMapLoaded(event: any) {
      event.map.jumpTo({ "center": [this.advert.longtitude, this.advert.latitude], "zoom": 13 });

      new Marker().setLngLat([this.advert.longtitude, this.advert.latitude]).addTo(event.map)
    },

    loggedInUserIsAdvertOwner(){
      console.log(this.advertUser)
      console.log(this.advert.UUID.UUID)
      console.log(this.advertUser !== this.advert.UUID.UUID)
      return this.advertUser !== this.advert.UUID.UUID;
    },

    UpdateAdvert() {
      console.log("update")
    },

    DeleteAdvert() {
      console.log("delete")
    }
  }
});
</script>

<style scoped>
.rounded {
  border-radius: 10px;
}
</style>

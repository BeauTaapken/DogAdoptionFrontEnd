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
              <v-carousel-item v-bind:src="advert.img"> </v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col cols="4">
            <v-card height="400" class="mx-auto card" max-width="700" outlined>
              <MglMap :accessToken="accessToken" :mapStyle="mapStyle" heigt="200" @load="onMapLoaded">
                <MglMarker :coordinates="mapMarker">
                  <v-icon slot="marker">mdi-map-marker</v-icon>
                </MglMarker>
              </MglMap>
              <v-card-text>Location: placeholder</v-card-text>
              <v-card-text>Minimum price: placeholder</v-card-text>
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
          Breed: {{ advert.breed }} <br />
          Age: {{ advert.age }}
        </v-row>
        <v-row>
          {{ advertUser }}
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store/persistStore";
import Mapbox, {Marker} from "mapbox-gl";
import { MglMap, MglMarker } from "vue-mapbox";
import axios from "axios";

export default Vue.extend({
  name: "Advert",
  props: {
    advertId: {
      required: true
    }
  },
  components: {
    MglMap,
    MglMarker
  },
  data: function() {
    return {
      advert: null as any,
      user: null as any,
      advertUser: "" as string,
      accessToken: "pk.eyJ1IjoiYmVhdXRhYXBrZW4iLCJhIjoiY2s4bzYzODdlMHZxODNvbzJmN3NkajFvNiJ9.O-fXCB7kq00f3Znp68y9rQ",
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      mapbox: null as any,
      map: null as any,
      mapMarker: [0, 0] as [any, any],
    };
  },
  created(): void {
    this.advert = store.getters.getAdvert(this.advertId);
    console.log(this.advert)
    this.mapbox = Mapbox;
  },
  mounted(): void {
    this.user = store.getters.getUser;
    //TODO get advert based data like bids with api call

    axios
    .get("user/getuser/" + this.advert.UUID.UUID)
    .then(response => {
      this.advertUser = response.data;
    })
    .catch(error => {
      console.log(error)
    });
  },
  methods: {
    onMapLoaded(event: any) {
      console.log(this.advert.longtitude);
      console.log(this.advert.latitude);
      event.map.jumpTo({"center": [this.advert.longtitude, this.advert.latitude], "zoom": 8});
      //this.mapMarker = [this.advert.longtitude, this.advert.latitude];
      new Marker().setLngLat([this.advert.longtitude, this.advert.latitude]).addTo(event.map)
      console.log(this.mapMarker)
    }
  }
});
</script>

<style scoped>
.rounded {
  border-radius: 10px;
}
#map {
  width: 100%;
  height: 500px;
}
</style>

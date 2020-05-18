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
              <v-carousel-item v-bind:src="advert.img" />
            </v-carousel>
          </v-col>
          <v-col cols="4">
            <v-card height="400" class="mx-auto card" max-width="700" outlined>
              <MglMap
                :accessToken="accessToken"
                :mapStyle="mapStyle"
                heigt="200"
                @load="onMapLoaded"
              />
              <v-card-title>Location:</v-card-title>
              <v-card-text>{{ advert.place }}</v-card-text>
              <v-card-title>User:</v-card-title>
              <v-card-text>{{ advertUser }}</v-card-text>
              <v-card-actions>
                <v-btn v-if="isSameUser" name="update" @click="UpdateAdvert" class="primary update"
                  >Update advert</v-btn
                >
                <v-btn v-if="isSameUser" name="delete" @click="DeleteAdvert" class="primary delete"
                  >Delete advert</v-btn
                >
<!--                TODO Mailing functionality in frontend-->
                <v-btn v-if="!isSameUser" name="mail" class="primary mail">Mail owner of dog</v-btn>
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
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline" primary-title>
          {{ this.dialogHeader }}
        </v-card-title>

        <v-card-text>{{ this.dialogInfo }}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            Oke
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Mapbox, { Marker } from "mapbox-gl";
import { MglMap } from "vue-mapbox";
import axios from "axios";
import router from "@/router";
import * as firebase from "firebase";

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
      accessToken:
        "pk.eyJ1IjoiYmVhdXRhYXBrZW4iLCJhIjoiY2s4bzYzODdlMHZxODNvbzJmN3NkajFvNiJ9.O-fXCB7kq00f3Znp68y9rQ",
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      mapbox: null as any,
      isSameUser: false as boolean,
      dialog: false as boolean,
      dialogHeader: "" as string,
      dialogInfo: "" as string
    };
  },
  created(): void {
    this.advert = this.$store.getters.getAdvert(this.advertId);
    this.mapbox = Mapbox;
  },
  mounted(): void {
    this.user = this.$store.getters.getUser;
    //TODO get advert based data like bids with api call

    axios
      .get("user/getuser/" + this.advert.UUID.UUID)
      .then(response => {
        this.advertUser = response.data;
        this.isSameUser = this.user.uid === this.advert.UUID.UUID;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onMapLoaded(event: any) {
      event.map.jumpTo({
        center: [this.advert.longtitude, this.advert.latitude],
        zoom: 13
      });

      new Marker()
        .setLngLat([this.advert.longtitude, this.advert.latitude])
        .addTo(event.map);
    },

    UpdateAdvert() {
      router.push({ path: "update/" + this.advertId });
    },

    DeleteAdvert() {
      const firebaseUser = firebase.auth().currentUser;
      if (firebaseUser !== null) {
        firebaseUser
          .getIdToken(/* forceRefresh */ true)
          .then((idToken: string) => {
            axios
              .delete("/advert/deleteadvert", {
                headers: {
                  firebaseToken: idToken,
                  advertId: this.advertId
                }
              })
              .then(response => {
                this.dialog = true;
                if (response.status === 200) {
                  router.push({ name: "Home" });
                } else {
                  this.dialogHeader = "Something went wrong";
                  this.dialogInfo =
                    "Something went wrong. Try again or wait a few minutes to create an advert.";
                }
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
  }
});
</script>

<style scoped>
.rounded {
  border-radius: 10px;
}
</style>

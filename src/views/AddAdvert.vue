<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex xs24 sm16 md6>
        <v-form ref="addadvertform">
          <v-row>
            <v-col>
              <v-file-input
                filled
                accept="image/*"
                label="Select the picture of the dog"
                name="img"
                v-model="image"
                counter
                show-size
                multiple
                :rules="imageRule"
                @change="getBase64"
                prepend-icon=""
              >
              </v-file-input>

              <v-text-field v-model="base64" v-show="false" required></v-text-field>

              <v-text-field
                filled
                label="Title"
                name="title"
                type="text"
                v-model="title"
                :rules="textRules"
                required
              ></v-text-field>

              <v-textarea
                filled
                label="Description"
                name="description"
                type="text"
                v-model="description"
                :rules="textRules"
                required
              ></v-textarea>

              <v-select
                filled
                :items="items"
                item-text="breedName"
                label="Select the dogs breed"
                v-model.number="breed"
                required
              ></v-select>

              <v-text-field
                filled
                label="Age"
                name="age"
                type="number"
                v-model.number="age"
                :rules="numberRules"
                required
              ></v-text-field>
              <v-text-field v-model="longtitude" v-show="false" required :rules="numberRules"></v-text-field>
              <v-text-field v-model="longtitude" v-show="false" required :rules="numberRules"></v-text-field>
              <v-text-field v-model="place" v-show="false" required :rules="textRules"></v-text-field>
              <v-btn @click="addAdvert">
                Add advert
              </v-btn>
            </v-col>

            <v-col>
              <MglMap
                :accessToken="accessToken"
                :mapStyle="mapStyle"
                heigt="200"
                @load="onMapLoaded"
                class="rounded"
              />
            </v-col>
          </v-row>
        </v-form>
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
import axios from "axios";
import store from "../store/persistStore";
import * as firebase from "firebase";
import Mapbox from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { MglMap } from "vue-mapbox";

export default Vue.extend({
  name: "AddAdvert",
  data: function() {
    return {
      user: null as any,
      items: [] as any,
      image: null as Blob | null,
      title: null as string | null,
      description: null as string | null,
      breed: null as number | null,
      age: null as number | null,
      base64: null as string | null,
      dialog: false as boolean,
      dialogHeader: "" as string,
      dialogInfo: "" as string,
      accessToken:
        "pk.eyJ1IjoiYmVhdXRhYXBrZW4iLCJhIjoiY2s4bzYzODdlMHZxODNvbzJmN3NkajFvNiJ9.O-fXCB7kq00f3Znp68y9rQ",
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      mapbox: null as any,
      longtitude: null as number | null,
      latitude: null as number | null,
      place: null as string | null,

      imageRule: [(v: Blob) => !!v || "Image is required"],
      textRules: [(v: string) => !!v || "This is required"],
      numberRules: [(v: number) => !!v || "This is required"]
    };
  },
  components: {
    MglMap
  },
  created() {
    this.mapbox = Mapbox;
  },
  mounted(): void {
    this.user = store.getters.getUser;

    axios.get("/enum/getdogbreeds").then(response => {
      for (let i = 0; i < response.data.breeds.length; i++) {
        const lowercase = response.data.breeds[i]
          .toLowerCase()
          .replace(/_/g, " ");
        const breed = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
        this.items.push({ value: i, breedName: breed });
      }
    });
  },
  methods: {
    async addAdvert() {
      if (
        (this.$refs.addadvertform as Vue & {
          validate: () => boolean;
        }).validate()
      ) {
        const firebaseUser = firebase.auth().currentUser;
        if (firebaseUser !== null) {
          firebaseUser
            .getIdToken(/* forceRefresh */ true)
            .then((idToken: string) => {
              axios
                .post(
                  "/advert/addadvert",
                  {
                    UUID: {
                      UUID: this.user.uid,
                      Username: this.user.displayName
                    },
                    img: this.base64,
                    title: this.title,
                    description: this.description,
                    breed: Number(this.breed),
                    age: Number(this.age),
                    longtitude: this.longtitude,
                    latitude: this.latitude,
                    place: this.place,
                  },
                  {
                    headers: {
                      id: idToken
                    }
                  }
                )
                .then(response => {
                  this.dialog = true;
                  if (response.data.responseCode === "Done") {
                    this.dialogHeader = "Your advert has been created";
                    this.dialogInfo = "";
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
      else{
        this.dialog = true;
        this.dialogHeader = "No location selected";
        this.dialogInfo = "To add an advert you need to select a location in the map";
      }
    },

    getBase64() {
      if (this.image !== null) {
        for (let i = 0; i < this.image.length; i++) {
          const reader = new FileReader();
          reader.readAsDataURL(this.image[i]);

          reader.onloadend = () => {
            this.base64 = reader.result;
          };
          reader.onerror = error => {
            console.log("Error: ", error);
          };
        }
      }
    },

    onMapLoaded(event: any) {
      event.map.jumpTo({ center: [5, 52], zoom: 8 });

      event.map.addControl(
        new MapboxGeocoder({
          accessToken: this.accessToken,
          mapboxgl: Mapbox,
          marker: true,
          getItemValue: (e: any) => {
            this.longtitude = e.geometry.coordinates[0];
            this.latitude = e.geometry.coordinates[1];
            this.place = e.place_name;
          }
        })
      );
    }
  }
});
</script>

<style scoped>
  .rounded {
    border-radius: 10px;
  }
</style>

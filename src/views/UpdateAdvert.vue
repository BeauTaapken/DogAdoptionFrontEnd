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
                Update advert
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
import * as firebase from "firebase";
import { MglMap } from "vue-mapbox";
import Mapbox, { Marker } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

export default Vue.extend({
  name: "UpdateAdvert",
  props: {
    advertId: {
      required: true
    }
  },
  data: function() {
    return {
      user: null as any,
      items: [] as any,
      advert: null as any,
      image: null as Blob | null,
      title: null as string | null,
      description: null as string | null,
      breed: null as number | null,
      oldBreed: null as any,
      age: null as number | null,
      base64: null as string | ArrayBuffer | null,
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
    this.advert = this.$store.getters.getAdvert(this.advertId);
    this.mapbox = Mapbox;
    this.image = this.b64toBlob(this.advert.img);

    this.getBase64();
    //this.base64 = this.advert.img;
    this.title = this.advert.title;
    this.description = this.advert.description;

    this.oldBreed = this.advert.breed;

    this.age = this.advert.age;
    this.longtitude = this.advert.longtitude;
    this.latitude = this.advert.latitude;
    this.place = this.advert.place;
  },
  mounted(): void {
    this.user = this.$store.getters.getUser;

    axios.get("/enum/getdogbreeds").then(response => {
      for (let i = 0; i < response.data.breeds.length; i++) {
        const lowercase = response.data.breeds[i]
          .toLowerCase()
          .replace(/_/g, " ");
        const breed = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);

        this.items.push({ value: i, breedName: breed });
        //TODO make breed autoselect
      }
    });
  },
  methods: {
    b64toBlob(dataURI: string) {

      const byteString = atob(dataURI.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: 'image/jpeg' });
    },

    onMapLoaded(event: any) {
      event.map.jumpTo({
        center: [this.advert.longtitude, this.advert.latitude],
        zoom: 13
      });

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

      new Marker()
      .setLngLat([this.advert.longtitude, this.advert.latitude])
      .addTo(event.map);
    },

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
                .put(
                  "/advert/updateadvert",
                  {
                    advertId: this.advertId,
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
                    place: this.place
                  },
                  {
                    headers: {
                      firebaseToken: idToken
                    }
                  }
                )
                .then(response => {
                  this.dialog = true;
                  if (response.status === 200) {
                    this.dialogHeader = "Your advert has been updated";
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
        // for (let i = 0; i < this.image.length; i++) {
        //   console.log("for loop");
        //   const reader = new FileReader();
        //   reader.readAsDataURL(this.image[i]);
        //
        //   console.log("now in readasdataurl");
        //
        //   reader.onloadend = () => {
        //     console.log("result: " + reader.result);
        //     this.base64 = reader.result;
        //     console.log("result: " + reader.result);
        //   };
        //   reader.onerror = error => {
        //     console.log("Error: ", error);
        //   };
        // }
        const reader = new FileReader();
        reader.readAsDataURL(this.image);

        reader.onloadend = () => {
          this.base64 = reader.result;
        };
        reader.onerror = error => {
          console.log("Error: ", error);
        };
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

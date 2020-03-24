<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs12 sm8 md4>
        <v-form ref="registerform">
          <v-file-input
            accept="image/*"
            label="Select the picture of the dog"
            name="img"
            v-model="image"
            counter
            show-size
            multiple
            :rules="imageRule"
            @change="getBase64"
            required
          >
          </v-file-input>

          <v-text-field v-model="base64" v-show="false"></v-text-field>

          <v-text-field
            label="Title"
            name="title"
            prepend-icon="mdi-account"
            type="text"
            v-model="title"
            :rules="textRules"
            required
          ></v-text-field>

          <v-text-field
            label="Description"
            name="description"
            prepend-icon="mdi-email"
            type="text"
            v-model="description"
            :rules="textRules"
            required
          ></v-text-field>

          <v-select
            :items="items"
            item-text="breedName"
            label="Select the dogs breed"
            v-model.number="breed"
          ></v-select>

          <v-text-field
            label="Age"
            name="age"
            prepend-icon="mdi-lock"
            type="number"
            v-model.number="age"
            :rules="numberRules"
            required
          ></v-text-field>
          <v-btn @click="addAdvert">
            What is image
          </v-btn>
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

export default Vue.extend({
  name: "AddAdvert",
  data: function() {
    return {
      user: null as any,
      items: [] as any,
      image: null as any,
      title: null as string | null,
      description: null as string | null,
      breed: null as number | null,
      age: null as number | null,
      base64: null as any,
      dialog: false as boolean,
      dialogHeader: "" as string,
      dialogInfo: "" as string,

      imageRule: [(v: Blob) => !!v || "Image is required"],
      textRules: [(v: string) => !!v || "This is required"],
      numberRules: [(v: number) => !!v || "This is required"]
    };
  },
  mounted(): void {
    this.user = store.getters.getUser;

    axios.get("/enum/getdogbreeds").then(response => {
      console.log(response.data);
      for (let i = 0; i < response.data.breeds.length; i++) {
        const lowercase = response.data.breeds[i]
          .toLowerCase()
          .replace(/_/g, " ");
        const breed = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
        this.items.push({ value: i, breedName: breed });
      }
      console.log(this.items);
    });
  },
  methods: {
    async addAdvert() {
      const firebaseUser = firebase.auth().currentUser;
      if (firebaseUser !== null) {
        firebaseUser
          .getIdToken(/* forceRefresh */ true)
          .then((idToken: string) => {
            console.log(this.breed);
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
                  age: Number(this.age)
                },
                {
                  headers: {
                    id: idToken
                  }
                }
              )
              .then(response => {
                console.log(response);
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
    },

    getBase64() {
      if (this.image !== null) {
        for (let i = 0; i < this.image.length; i++) {
          const reader = new FileReader();
          reader.readAsDataURL(this.image[i]);

          reader.onloadend = () => {
            this.base64 = reader.result;
            // this.base64.push(reader.result.toString());
          };
          reader.onerror = error => {
            console.log("Error: ", error);
          };
        }
      }
    }
  }
});
</script>

<style scoped></style>

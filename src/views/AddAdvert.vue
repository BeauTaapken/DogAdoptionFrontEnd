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
            counter=true
            show-size=true
            :rules="imageRule"
            required
          >
          </v-file-input>

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

          <v-text-field
            label="Breed"
            name="breed"
            prepend-icon="mdi-lock"
            type="number"
            v-model.number="breed"
            :rules="numberRules"
            required
          ></v-text-field>

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
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import store from "../store/index";
import * as firebase from "firebase";

export default Vue.extend({
  name: "AddAdvert",
  data: function() {
    return {
      user: null as any,
      image: null as any,
      title: null as string | null,
      description: null as string | null,
      breed: null as number | null,
      age: null as number | null,
      base64: null as any,

      imageRule: [(v: Blob) => !!v || "Image is required"],
      textRules: [
        (v: string) => !!v || "This is required",
      ],
      numberRules: [
        (v: number) => !!v || "This is required",
      ]
    };
  },
  mounted(): void {
    this.user = store.getters.getUser;
  },
  methods: {
    async addAdvert() {
    //TODO turn image in v-file-input to base64
      firebase.auth().currentUser
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
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch((error: any) => {
          // Handle error
          console.log(error);
        });
    },

    // getBase64() {
    //   const reader = new FileReader();
    //   if (this.image !== null) {
    //     reader.onload = () => {
    //       // console.log(reader.result)
    //       this.base64 = reader.result;
    //       return reader.result;
    //     };
    //     reader.readAsDataURL(this.image[0]);
    //     reader.onerror = error => {
    //       console.log("Error: ", error);
    //     };
    //   }
    // }
  }
});
</script>

<style scoped></style>

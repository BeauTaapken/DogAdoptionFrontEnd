<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn icon large to="/register" v-on="on">
                  <v-icon>mdi-account-plus</v-icon>
                </v-btn>
              </template>
              <span>Register</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form ref="login">
              <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                v-model="email"
                :rules="emailRules"
                type="text"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                v-model="password"
                :rules="passwordRules"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
            <!--            <v-btn color="primary" @click="logout">logout</v-btn>-->
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-overlay :value="overlay">
      <i class="fa-5x fas fa-spinner fa-pulse"></i>
    </v-overlay>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline" primary-title>
          Something went wrong!
        </v-card-title>

        <v-card-text>{{ this.dialogInfo }}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            I understand
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import firebase from "firebase";
import router from "../router";
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "Login" as string,
  data: function() {
    return {
      email: "",
      password: "",
      overlay: false,
      dialog: false,
      dialogInfo: "",

      emailRules: [
        (v: any) => !!v || "E-mail is required",
        (v: string) => /^(.+)@(.+)+\.(.+)$/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [(v: any) => !!v || "Password is required"]
    };
  },
  methods: {
    login() {
      if ((this.$refs.login as Vue & { validate: () => boolean }).validate()) {
        this.overlay = true;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            if (user.user) {
              console.log("testing");
              console.log(user);
              axios
                .get("user/getuser/" + user.user.uid)
                .then(response => {
                  if (user.user) {
                    console.log(response);
                    user.user
                      .updateProfile({
                        displayName: response.data,
                        photoURL: null
                      })
                      .then(() => {
                        router.push({ path: "Home" });
                      })
                      .catch(error => {
                        this.overlay = false;
                        this.dialog = true;
                        this.dialogInfo =
                          "Username could not be requested, try again later.";
                      });
                  }
                })
                .catch(error => {
                  this.overlay = false;
                  this.dialog = true;
                  this.dialogInfo =
                    "Something went wrong while requesting your username, try again later.";
                });
            }
          })
          .catch(error => {
            this.overlay = false;
            this.dialog = true;
            this.dialogInfo = error.message;
            return;
          });
      }
    }
    //TODO change location of the logout function to the navbar that will have a logout button
    // logout() {
    //   firebase
    //     .auth()
    //     .signOut()
    //     .then(function() {
    //       // Sign-out successful.
    //     })
    //     .catch(function(error) {
    //       // An error happened.
    //     });
    // }
  }
});
</script>

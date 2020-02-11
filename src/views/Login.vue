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
  </v-container>
</template>

<script lang="ts">
import firebase from "firebase";
import router from "../router";
import Vue from "vue";

export default Vue.extend({
  name: "Login" as string,
  data: function() {
    return {
      email: "",
      password: "",

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
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .catch(function(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
          });
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            router.push({ path: "Home" });
          }
        });
      }
    },
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

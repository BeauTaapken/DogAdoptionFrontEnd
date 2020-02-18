<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Register form</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn icon large to="/" v-on="on">
                  <v-icon>mdi-login-variant</v-icon>
                </v-btn>
              </template>
              <span>Login</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form ref="register">
              <v-text-field
                label="Username"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                v-model="username"
                :rules="usernameRules"
                required
              ></v-text-field>

              <v-text-field
                id="email"
                label="Email"
                name="password"
                prepend-icon="mdi-email"
                type="email"
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                :rules="passwordRules"
                required
              ></v-text-field>

              <v-text-field
                id="repeatPassword"
                label="Repeat password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="repeatPassword"
                :rules="[passwordRules, passwordConfirmRule]"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="register">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-overlay :value="overlay">
      <i class="fa-5x fas fa-spinner fa-pulse"></i>
    </v-overlay>
    <v-dialog v-model="dialog" width="500" >
      <v-card>
        <v-card-title class="headline" primary-title>
          Something went wrong!
        </v-card-title>

        <v-card-text>{{ this.dialogInfo }}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
                  color="primary"
                  text
                  @click="dialog = false"
          >
            I accept
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

export default Vue.extend({
  name: "Register" as string,
  data() {
    return {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      overlay: false,
      dialog: false,
      dialogInfo: "",

      usernameRules: [(v: string) => !!v || "Username is required"],
      emailRules: [
        (v: string) => !!v || "E-mail is required",
        (v: string) => /^(.+)@(.+)+\.(.+)$/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        (v: string) => !!v || "Password is required",
        (v: string | any[]) =>
          v.length >= 6 || "Minimum Of 6 Charachters Is Required"
      ]
    };
  },
  methods: {
    register() {
      if ((this.$refs.register as Vue & { validate: () => boolean }).validate()) {
        this.overlay = true;
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .catch((error: { code: string; message: string }) => {
            this.overlay = false;
            this.dialog = true;
            this.dialogInfo = error.message;
            return;
          });
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log(user);
            user
              .updateProfile({
                displayName: this.username,
                photoURL: null
              })
              .then(
                function() {
                  const displayName = user.displayName;
                  router.push({ name: "Login" });
                },
                function(error) {
                  console.log(error);
                }
              );
          }
        });
      }
    }
  },
  computed: {
    passwordConfirmRule(): any {
      return this.password === this.repeatPassword || "passwords must match";
    }
  }
});
</script>

<style scoped></style>

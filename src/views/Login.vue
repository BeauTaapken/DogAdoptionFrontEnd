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
                <v-btn
                  icon
                  large
                  to="/register"
                  v-on="on"
                >
                  <v-icon>mdi-account-plus</v-icon>
                </v-btn>
              </template>
              <span>Register</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form ref="login">
              <v-text-field
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Login" as string,
  components: {},
  methods: {
    login(){
      if((this.$refs.login as Vue & { validate: () => boolean}).validate()){
        //Add login for firebase
      }
    }
  }
});
</script>

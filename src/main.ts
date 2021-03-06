import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as firebase from "firebase";
import vuetify from "./plugins/vuetify";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';

library.add(faUserSecret);

Vue.component("font-awesome-icon", FontAwesomeIcon);

axios.defaults.baseURL = "http://localhost:8081";

Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig: { [key: string]: string } = {
  apiKey: "AIzaSyCkrji6inel7j0o34M-3PeYDjkn4Vf569k",
  authDomain: "dogadoption-ab286.firebaseapp.com",
  databaseURL: "https://dogadoption-ab286.firebaseio.com",
  projectId: "dogadoption-ab286",
  storageBucket: "dogadoption-ab286.appspot.com",
  messagingSenderId: "838499711944",
  appId: "1:838499711944:web:766e6deae4c65cf9671efd",
  measurementId: "G-N9WFKZYVZT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

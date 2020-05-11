import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#0d111a",
        secondary: "#2a2e37",
        tertiary: "#0f131c",
        accent: "#8c9eff",
        error: "#b51209",
        background: "#1b262c",
        text: "#535966"
      }
    }
  }
});

export default vuetify;

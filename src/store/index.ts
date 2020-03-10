import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "" as any
  },
  mutations: {
    setUser (state, value) {
      state.user = value;
    }
  },
  actions: {},
  modules: {}
});

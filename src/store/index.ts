import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'user',
  storage: window.sessionStorage
})


export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    firebasecomponent: null as any,
    user: null as any
  },
  mutations: {
    setUser (state, value) {
      state.user = value;
    },
    setFirebaseComponent(state, value) {
      state.firebasecomponent = value;
    }
  },
  actions: {},
  modules: {},
  // @Component({
  //   computed: {
  //     ...mapGetters('UserModule', {
  //        'getUser': any
  //     })
  //   }
  // })
  getters: {
    getUser: state => state.user,
    getFirebaseComponent: state => state.firebasecomponent
  }
});

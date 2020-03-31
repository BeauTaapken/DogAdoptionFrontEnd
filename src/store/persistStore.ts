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
    user: null as any,
    adverts: [] as []
  },
  mutations: {
    SET_USER (state, value) {
      state.user = value;
    },
    SET_ADVERTS(state, value) {
      for(let i = 0; i < value.length; i++){
        state.adverts.push(value[i]);
      }
    },
    RESET_ADVERTS(state, value){
      state.adverts = [];
    }
  },
  actions: {
    setUser ({commit}, value) {
      commit('SET_USER', value);
    },
    setAdverts({commit}, data){
      commit('SET_ADVERTS', data);
    },
    resetAdverts({commit}){
      commit('RESET_ADVERTS')
    }
  },
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
    getAdverts: state => state.adverts,
    getAdvert(state) {
      return (keyword: number) =>
        state.adverts.find(
          (advert: { advertId: number }) => advert.advertId == keyword
        );
    }
  }
});

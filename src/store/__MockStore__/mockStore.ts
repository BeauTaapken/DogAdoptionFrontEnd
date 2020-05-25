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
    user: { uid: "testuser", displayName: "test" } as any,
    adverts: [
      {
        advertId: "advertid",
        UUID: { UUID: "testuser", Username: "test" },
        age: 1,
        breed: "Labrador",
        date: "2020-05-04T11:47:39",
        description: "testdescription",
        img: "testimg",
        latitude: 51.4519,
        longtitude: 5.48094,
        place: "Rachelsmolen R1, Eindhoven, Noord-Brabant 5612 MA, Nederland",
        title: "testname"
      },
      {
        advertId: "testAdvertId",
        UUID: { UUID: "othertestuser", Username: "othertestuser" },
        age: 1,
        breed: "Labrador",
        date: "2020-05-04T11:47:39",
        description: "testdescription",
        img: "testimg",
        latitude: 51.4519,
        longtitude: 5.48094,
        place: "Rachelsmolen R1, Eindhoven, Noord-Brabant 5612 MA, Nederland",
        title: "testname"
      }
    ] as any
  },
  mutations: {
    SET_USER (state: any, value) {
      state.user = value;
    },
    SET_ADVERTS(state, value) {
      for(let i = 0; i < value.length; i++){
        const lowercaseBreed = value[i].breed.toLowerCase().replace(/_/g, " ");
        value[i].breed = lowercaseBreed.charAt(0).toUpperCase() + lowercaseBreed.slice(1);
        state.adverts.push(value[i]);
      }
    },
    RESET_ADVERTS(state){
      state.adverts = [];
    },
    RESET_VALUES(state) {
      state.user = null;
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
      commit('RESET_ADVERTS');
    },
    resetValues({commit}){
      commit('RESET_VALUES');
    }
  },
  modules: {},
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

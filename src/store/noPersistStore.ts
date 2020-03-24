import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adverts: []
  },
  mutations: {
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
    getAdverts: state => state.adverts
  }
});

import Vue from 'vue';
import Vuex from 'Vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    active: 1
  },
  mutations: {
    changeLoginState (state, val) {
    	state.isLogin = val;
    },
    changeActive (state, val) {
    	state.active = val;
    }
  }
})
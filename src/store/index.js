import Vue from 'vue';
import Vuex from 'Vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: ''
  },
  mutations: {
    change (state, val) {
    	state.loginUser = val;
    }
  }
})
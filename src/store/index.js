import Vue from 'vue';
import Vuex from 'Vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: '张三'
  },
  mutations: {
    change (state, val) {
      state.name = val;
    }
  }
})
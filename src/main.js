// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from 'jquery'
import axios from 'axios'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index.js'

Vue.prototype.$http = axios;
Vue.prototype.$jq = $;

Vue.prototype.$post = function (url, params) {
	return new Promise((resolve, reject) => {
    $.post(url, params, function (data) {
      if (typeof data === 'string' && data.indexOf('{') != -1 && data.indexOf('[') != -1) {
        data = JSON.parse(data);
      }
      resolve(data);
    });
  });
};
window.host = 'http://localhost/apartment_php/api/';
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

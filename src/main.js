import Vue from 'vue'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router';
import VueCryptojs from 'vue-cryptojs';
import axios from 'axios'

Vue.prototype.$http = axios
Vue.use(VueCryptojs)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

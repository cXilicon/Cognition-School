import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './pages/login.vue'
import router from './router'
import axios from 'axios'


Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  render: h => h(App),
}).$mount('#app');
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

import router from './router';

// 导入样式
import './assets/css/global.css';

// import axios from 'axios';
// 配置请求的根路径
// axios.defaults.baseURL = 'http://192.168.0.167:8888/';
// Vue.prototype.$http = axios;

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

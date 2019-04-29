import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store/store';
import axios from 'axios';
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
import dimUpload from './plugins/upload';

Vue.use(dimUpload);
Vue.use(Viewer, {
  defaultOptions: {
    title: false,
    toolbar: 0,
    tooltip: false,
    navbar: 0
  }
});

// time format
Vue.filter('timeFormat', v => {
  var date = new Date(v);
  return date.toLocaleString();
});

// cut long string short
Vue.filter('longText', (v, index) => {
  if (v.length > index) {
    var newString = v.substring(0, index);
    return newString + '...';
  } else {
    return v;
  }
});

//axios.defaults.baseURL = 'http://skyhawkapi.huilab.cn/api';
//axios.defaults.baseURL = "http://monitor2.huilab.cn/api";
// axios.defaults.baseURL = "http://127.0.0.1:8001/api";
axios.defaults.baseURL = 'https://skyhawkapi.insdim.com/api';

axios.interceptors.request.use(config => {
  try {
    config.headers['AUTH'] = store.getters['user/userInfo'].token;
  } catch (err) {
    return err;
  }
  return config;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

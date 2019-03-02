import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import axios from "axios";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import qs from "qs";
import dimUpload from "./plugins/upload";

Vue.use(dimUpload);
Vue.use(Viewer, {
  defaultOptions: {
    title: false,
    toolbar: 0,
    tooltip: false,
    navbar: 0
  }
});

//axios.defaults.baseURL = 'http://skyhawkapi.huilab.cn/api';
//axios.defaults.baseURL = "http://monitor2.huilab.cn/api";
axios.defaults.baseURL = "http://127.0.0.1:8001/api";

axios.interceptors.request.use(config => {
  try {
    config.headers["Authorization"] = store.getters["user/userInfo"].token;
  } catch (err) {}
  return config;
});

Vue.use(require("vue-moment"));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import axios from "axios";

//axios.defaults.baseURL = 'http://skyhawkapi.huilab.cn/api';
axios.defaults.baseURL = "http://monitor2.huilab.cn/api";
//axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

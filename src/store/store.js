import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import Cookies from "js-cookie";

import user from "./modules/user";
import organization from "./modules/organization";
import company from "./modules/company";
import alert from "./modules/alert";
import device from "./modules/device";

Vue.use(Vuex);

const vuexCookie = new VuexPersistence({
  restoreState: (key, storage) => Cookies.getJSON(key),
  saveState: (key, state, storage) =>
    Cookies.set(key, state, {
      expires: 3
    }),
  reducer: state => ({ user: state.user }),
  filter: mutation => mutation.type == "user/updateUserInfo"
});

const vuexSession = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: state => ({
    user: state.user,
    company: state.company,
    organization: state.organization,
    alert: state.alert
  }),
  filter: mutation =>
    mutation.type == "user/updateUserInfo" ||
    "user/updateOnlineRate" ||
    "company/getCompanyList" ||
    "organization/getOrganizationList" ||
    "alert/getAlertList" ||
    "alert/updateAlertList" ||
    "alert/restoreAlertList" ||
    "device/updateOnlineRate"
});

export default new Vuex.Store({
  modules: {
    user,
    company,
    organization,
    alert,
    device
  },
  plugins: [vuexCookie.plugin, vuexSession.plugin]
});

import Vue from "vue";
import Vuetify from "vuetify/lib";
import zhHans from "vuetify/es5/locale/zh-Hans";
import colors from "vuetify/es5/util/colors";

import "./confirm-dialog/index";
import "./snackbar/index";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.blue.lighten2,
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  },
  lang: {
    locales: { zhHans },
    current: "zhHans"
  },
  icons: {
    iconfont: "md"
  }
});

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("./views/Login")
    },
    {
      path: "/index",
      component: () => import("./views/Index"),
      children: [
        {
          path: "/today",
          component: () => import("./components/today/Today")
        },
        {
          path: "/map",
          component: () => import("./components/map/MapView")
        }
      ]
    },
    {
      path: "/mobile",
      component: () => import("./views/IndexMobile")
    }
  ]
});

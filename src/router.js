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
        },
        {
          path: "/alert",
          component: () => import("./components/alert/AlertList"),
          children: [
            {
              path: "/alert/:id",
              component: () => import("./components/alert/AlertDetail")
            }
          ]
        },
        {
          path: "/organization",
          component: () => import("./components/organization/OrganizationList"),
          children: [
            {
              path: "/organization/:id",
              component: () =>
                import("./components/organization/OrganizationDetail")
            }
          ]
        },
        {
          path: "/company",
          component: () => import("./components/company/CompanyList"),
          children: [
            {
              path: "/company/:id",
              component: () => import("./components/company/CompanyDetail"),
              children: [
                {
                  path: "/company/:id/info",
                  component: () => import("./components/company/CompanyInfo")
                },
                {
                  path: "/company/:id/supervisor",
                  component: () =>
                    import("./components/company/CompanySupervisor")
                },
                {
                  path: "/company/:id/device",
                  component: () => import("./components/company/CompanyDevice")
                },
                {
                  path: "/company/:id/gallery",
                  component: () => import("./components/company/CompanyGallery")
                },
                {
                  path: "/company/:id/alert",
                  component: () => import("./components/company/CompanyAlert")
                },
                {
                  path: "/company/:id/humiture",
                  component: () =>
                    import("./components/company/CompanyHumiture")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "/mobile",
      component: () => import("./views/IndexMobile")
    }
  ]
});

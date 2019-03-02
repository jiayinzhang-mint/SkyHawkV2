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
              path: "/alert/:alertId",
              component: () => import("./components/alert/AlertDetail")
            }
          ]
        },
        {
          path: "/admin/company",
          component: () => import("./components/admin/company/CompanyList"),
          children: [
            {
              path: "/admin/company/:companyId",
              component: () =>
                import("./components/admin/company/CompanyConfig"),
              children: [
                {
                  path: "/admin/company/:companyId/info",
                  component: () =>
                    import("./components/admin/company/CompanyInfo")
                },
                {
                  path: "/admin/company/:companyId/supervisor",
                  component: () =>
                    import("./components/admin/company/CompanySupervisor")
                },
                {
                  path: "/admin/company/:companyId/user",
                  component: () =>
                    import("./components/admin/company/CompanyUser")
                },
                {
                  path: "/admin/company/:companyId/monitor",
                  component: () =>
                    import("./components/admin/company/CompanyMonitor")
                }
              ]
            }
          ]
        },
        {
          path: "/organization",
          component: () => import("./components/organization/OrganizationList"),
          children: [
            {
              path: "/organization/:organizationId",
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
              path: "/company/:companyId",
              component: () => import("./components/company/CompanyDetail"),
              children: [
                {
                  path: "/company/:companyId/info",
                  component: () => import("./components/company/CompanyInfo")
                },
                {
                  path: "/company/:companyId/supervisor",
                  component: () =>
                    import("./components/company/CompanySupervisor")
                },
                {
                  path: "/company/:companyId/device",
                  component: () => import("./components/company/CompanyDevice")
                },
                {
                  path: "/company/:companyId/gallery",
                  component: () => import("./components/company/CompanyGallery")
                },
                {
                  path: "/company/:companyId/alert",
                  component: () => import("./components/company/CompanyAlert")
                },
                {
                  path: "/company/:companyId/humiture",
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

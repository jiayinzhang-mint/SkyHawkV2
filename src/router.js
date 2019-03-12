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
          component: () => import("./components/alert/AlertList")
        },
        {
          path: "/alert/:alertId",
          component: () => import("./components/alert/AlertDetail")
        },
        {
          path: "/admin/company",
          component: () => import("./components/admin/company/List"),
          children: [
            {
              path: "/admin/company/:companyId",
              component: () => import("./components/admin/company/Config"),
              children: [
                {
                  path: "/admin/company/:companyId/info",
                  component: () => import("./components/admin/company/Info")
                },
                {
                  path: "/admin/company/:companyId/supervisor",
                  component: () =>
                    import("./components/admin/company/Supervisor")
                },
                {
                  path: "/admin/company/:companyId/user",
                  component: () => import("./components/admin/company/User")
                },
                {
                  path: "/admin/company/:companyId/monitor",
                  component: () => import("./components/admin/company/Monitor")
                },
                {
                  path: "/admin/company/:companyId/setting",
                  component: () => import("./components/admin/company/Setting")
                }
              ]
            }
          ]
        },
        {
          path: "/admin/organization",
          component: () => import("./components/admin/organization/List"),
          children: [
            {
              path: "/admin/organization/:organizationId",
              component: () => import("./components/admin/organization/Config"),
              children: [
                {
                  path: "/admin/organization/:organizationId/info",
                  component: () =>
                    import("./components/admin/organization/Info")
                },
                {
                  path: "/admin/organization/:organizationId/user",
                  component: () =>
                    import("./components/admin/organization/User")
                },
                {
                  path: "/admin/organization/:organizationId/setting",
                  component: () =>
                    import("./components/admin/organization/Setting")
                }
              ]
            }
          ]
        },
        {
          path: "/organization",
          component: () => import("./components/organization/List"),
          children: [
            {
              path: "/organization/:organizationId",
              component: () => import("./components/organization/Detail")
            }
          ]
        },
        {
          path: "/company",
          component: () => import("./components/company/List"),
          children: [
            {
              path: "/company/:companyId",
              component: () => import("./components/company/Detail"),
              children: [
                {
                  path: "/company/:companyId/info",
                  component: () => import("./components/company/Info")
                },
                {
                  path: "/company/:companyId/supervisor",
                  component: () => import("./components/company/Supervisor")
                },
                {
                  path: "/company/:companyId/device",
                  component: () => import("./components/company/Device")
                },
                {
                  path: "/company/:companyId/gallery",
                  component: () => import("./components/company/Gallery")
                },
                {
                  path: "/company/:companyId/alert",
                  component: () => import("./components/company/Alert")
                },
                {
                  path: "/company/:companyId/humiture",
                  component: () => import("./components/company/Humiture")
                },
                {
                  path: "/company/:companyId/dailychecklist",
                  component: () => import("./components/company/DailyCheckList")
                },
                {
                  path: "/company/:companyId/score",
                  component: () => import("./components/company/Score")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "/mobile",
      component: () => import("./views/IndexMobile"),
      children: [
        {
          path: "/company/:companyId/dailycheckform",
          component: () => import("./components/company/DailyCheckForm")
        }
      ]
    }
  ]
});

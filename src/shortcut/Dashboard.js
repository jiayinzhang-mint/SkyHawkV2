import store from "../store/store";
import basicService from "../service/BasicService";
import userService from "../service/UserService";
import deviceService from "../service/DeviceService";
import alertService from "../service/AlertService";
import billboardService from "../service/BillboardService";

class dashboardShortcut {
  static async getInstantData() {
    userService.getOnlineRate();
    deviceService.getOnlineRate();
    deviceService.getSystemStatus();
    alertService.getUnprocessedAlert();
    this.getWeather();
    billboardService.getPostList();
  }

  static async getRecentData() {
    // this.getCompanyCalculateData();
    this.getOrganizationCalculateData(
      1,
      10,
      store.getters["user/userInfo"].station
    );
  }

  static async getCompanyCalculateData(dateType, day) {
    const rsp = await basicService.getRequest("/dashboard/companyscore", {
      dateType: dateType,
      day: day
    });
    return rsp;
  }

  static async getOrganizationCalculateData(dateType, number, station) {
    const rsp = await basicService.getRequest("/dashboard/organizescore", {
      dateType: dateType,
      number: number,
      station: station
    });
    store.commit("organization/updateOrganizationStatistic", rsp.data);
    return rsp;
  }

  static async getWeather() {
    const rsp = await basicService.getRequest("/utils/weather");
    store.commit("others/getWeather", rsp.lives[0]);
    return rsp;
  }
}

export default dashboardShortcut;

import basicService from "../service/BasicService";
import userService from "../service/UserService";
import deviceService from "../service/DeviceService";
import alertService from "../service/AlertService";

class dashboardShortcut {
  static async getInstantData() {
    userService.getOnlineRate();
    deviceService.getOnlineRate();
    deviceService.getSystemStatus();
    alertService.getUnprocessedAlert();
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
    return rsp;
  }
}

export default dashboardShortcut;

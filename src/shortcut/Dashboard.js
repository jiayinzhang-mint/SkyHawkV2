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

  static async getCalculateData(dateType, day) {
    await basicService.getRequest("/dashboard/companyscore", {
      dateType: dateType,
      day: day
    });
  }
}

export default dashboardShortcut;

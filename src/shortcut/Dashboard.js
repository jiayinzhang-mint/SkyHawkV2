import userService from "../service/UserService";
import deviceService from "../service/DeviceService";
import alertService from "../service/AlertService";

class dashboardShortcut {
  static async getInstantData() {
    userService.getOnlineRate();
    deviceService.getOnlineRate();
    alertService.getUnprocessedAlert();
  }
}

export default dashboardShortcut;

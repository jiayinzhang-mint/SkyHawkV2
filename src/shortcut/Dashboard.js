import userService from "../service/UserService";
import deviceService from "../service/DeviceService";

class dashboardShortcut {
  static async getInstantData() {
    userService.getOnlineRate();
    deviceService.getOnlineRate();
  }
}

export default dashboardShortcut;

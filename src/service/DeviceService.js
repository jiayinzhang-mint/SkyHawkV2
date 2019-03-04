import basicService from "./BasicService";
import message from "../utils/Message";
import store from "../store/store";

class monitorService {
  static async getMonitorList(query) {
    const rsp = await basicService.getRequest("/monitor/list", query);
    return rsp;
  }

  static async createMonitor(newMonitor) {
    const rsp = await basicService.postRequest("/monitor/list", newMonitor);
    message.snackbar(rsp.msg);

    return rsp;
  }

  static async updateMonitor(monitorInfo) {
    const rsp = await basicService.putRequest("/monitor/list", monitorInfo);
    message.snackbar(rsp.msg);

    return rsp;
  }

  static async deleteMonitor(query) {
    const rsp = await basicService.deleteRequest("/monitor/list", query);
    message.snackbar(rsp.msg);
    return rsp;
  }

  static async getOnlineRate() {
    const rsp = await basicService.getRequest("/dashboard/deviceinstant");
    var onlineRate = (rsp.deviceOnline / rsp.deviceCount).toFixed(4) * 100;
    store.commit("device/getOnlineRate", onlineRate);
    return rsp;
  }
}

export default monitorService;

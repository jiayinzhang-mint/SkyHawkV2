import basicService from "./BasicService";
import message from "../utils/Message";

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
}

export default monitorService;

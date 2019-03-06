import basicService from "./BasicService";
import message from "../utils/Message";
import store from "../store/store";

class alertService {
  static async createALert() {}

  static async getALertList() {
    var params = {};
    params.stationAlt = store.getters["user/userInfo"].station;
    params.page = 1;
    const rsp = await basicService.getRequest("/alert/list", params);
    store.dispatch("alert/getAlertList", rsp.alertList);
    return rsp;
  }

  static async updateAlertList() {
    var params = {};
    params.stationAlt = store.getters["user/userInfo"].station;
    params.page = store.getters["alert/alertPage"];
    const rsp = await basicService.getRequest("/alert/list", params);
    store.dispatch("alert/updateAlertList", rsp.alertList);
    return rsp;
  }

  static async restoreAlertList() {
    await store.dispatch("alert/restoreAlertList");
    this.getALertList();
  }

  static async getAlertDetail(alertId) {
    const rsp = await basicService.getRequest("alert/detail", { id: alertId });
    store.dispatch("alert/getAlertDetail", rsp.alertInfo);
    return rsp;
  }

  static async getUnprocessedAlert() {
    const rsp = await basicService.getRequest("dashboard/alertinstant");
    store.commit("alert/updateUnprocessedAlert", rsp.alertUnprocessed);
    return rsp;
  }

  static async updateALert() {}

  static async deleteComapny() {}
}

export default alertService;

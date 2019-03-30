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
    await this.getALertList();
  }

  static async getAlertDetail(alertId) {
    const rsp = await basicService.getRequest("alert/detail", { id: alertId });
    store.dispatch("alert/getAlertDetail", rsp.alertInfo);
    return rsp;
  }

  static async errorAlert(alertId) {
    const rsp = await basicService.postRequest("alert/detail", {
      alert: alertId,
      type: "error",
      id: store.getters["user/userInfo"].id
    });
    await this.restoreAlertList();

    message.snackbar(rsp.msg);
    return rsp;
  }

  static async uncertainAlert(alertId) {
    const rsp = await basicService.postRequest("alert/detail", {
      alert: alertId,
      type: "uncertain",
      id: store.getters["user/userInfo"].id
    });
    await this.restoreAlertList();

    message.snackbar(rsp.msg);
    return rsp;
  }

  static async repostAlert(alertId) {
    const rsp = await basicService.postRequest("alert/detail", {
      alert: alertId,
      type: "repost",
      id: store.getters["user/userInfo"].id
    });
    await this.restoreAlertList();

    message.snackbar(rsp.msg);
    return rsp;
  }

  static async finishAlert(alertId) {
    const rsp = await basicService.postRequest("alert/detail", {
      alert: alertId,
      type: "finish",
      id: store.getters["user/userInfo"].id
    });
    await this.restoreAlertList();

    message.snackbar(rsp.msg);
    return rsp;
  }

  static async deleteAlert(alertId) {
    const rsp = await basicService.postRequest("alert/detail", {
      alert: alertId,
      type: "delete"
    });
    await this.restoreAlertList();
    message.snackbar(rsp.msg);
    return rsp;
  }

  static async getUnprocessedAlert() {
    const rsp = await basicService.getRequest("dashboard/alertinstant");
    store.commit("alert/updateUnprocessedAlert", rsp.alertUnprocessed);
    return rsp;
  }

  static async updateAlertPage(alertPage) {
    store.commit("alert/updateAlertPage", alertPage);
  }
}

export default alertService;

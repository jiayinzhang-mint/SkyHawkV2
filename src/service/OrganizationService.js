import basicService from "./BasicService";
import message from "../utils/Message";
import store from "../store/store";

class organizationService {
  static async createOrganization(organizationInfo) {
    const rsp = await basicService.postRequest(
      "/organize/list",
      organizationInfo
    );
    message.snackbar(rsp.msg);
    return rsp;
  }

  static async getOrganizationList(query) {
    const rsp = await basicService.getRequest("/organize/list", query);
    store.dispatch("organization/getOrganizationList", rsp.organizeTree);
    return rsp;
  }

  static async getOrganizationDetail(query) {
    const rsp = await basicService.getRequest("/organize/detail", query);
    return rsp;
  }

  static async getOrganizationBound(stationId, all) {
    const rsp = await basicService.getRequest("/organize/bound", {
      id: stationId,
      all: all
    });
    return rsp;
  }

  static async updateOrganization(organizationDetaik) {
    const rsp = await basicService.putRequest(
      "/organize/list",
      organizationDetaik
    );
    message.snackbar(rsp.msg);
    return rsp;
  }

  static async deleteOrganization(stationId) {
    const rsp = await basicService.deleteRequest("/organize/list", {
      id: stationId
    });
    return rsp;
  }

  static async uploadPicture(fileForm) {}
}

export default organizationService;

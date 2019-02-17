import basicService from "./BasicService";
import message from "../utils/Message";
import store from "../store/store";

class organizationService {
  static async createOrganization() {}

  static async getOrganizationList(params) {
    const rsp = await basicService.getRequest("/organize/list", params);
    store.dispatch("organization/getOrganizationList", rsp.organizeTree);
    return rsp;
  }

  static async getOrganizationDetail(organizationId) {
    const rsp = await basicService.getRequest("/organize/detail", {
      id: organizationId
    });
    return rsp;
  }

  static async getOrganizationBound(stationId, all) {
    const rsp = await basicService.getRequest("/organize/bound", {
      id: stationId,
      all: all
    });
    return rsp;
  }

  static async updateOrganization() {}

  static async deleteOrganization(stationId) {
    const rsp = await basicService.deleteRequest("/organize/list", {
      id: stationId
    });
    return rsp;
  }
}

export default organizationService;

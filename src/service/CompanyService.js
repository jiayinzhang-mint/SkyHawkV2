import basicService from "./BasicService";
import message from "../utils/Message";
import store from "../store/store";

class companyService {
  static async createCompany() {}

  static async getCompanyList() {
    const rsp = await basicService.getRequest("/company/list");
    store.dispatch("company/getCompanyList", rsp.companyList);
    return rsp;
  }

  static async getCompanyDetail(companyId) {
    const rsp = await basicService.getRequest("/company/detail", {
      id: companyId
    });
    return rsp;
  }

  static async getCompanyDevice(companyId) {
    const rsp = await basicService.getRequest("/monitor/nvr", {
      company: companyId
    });
    return rsp;
  }

  static async getCompanyGallery(companyId, page) {
    const rsp = await basicService.getRequest("/gallery/list", {
      company: companyId,
      page: page
    });
    return rsp;
  }

  static async getCompanySupervisor(companyId) {
    const rsp = await basicService.getRequest("/company/supervise", {
      id: companyId
    });
    return rsp;
  }

  static async getCompanyHumiture(companyId) {
    const rsp = await basicService.getRequest("/monitor/humiture", {
      company: companyId
    });
    return rsp;
  }

  static async updateCompany() {}

  static async deleteComapny(companyId) {
    const rsp = await basicService.deleteRequest("/company/list", {
      id: companyId
    });
    return rsp;
  }
}

export default companyService;

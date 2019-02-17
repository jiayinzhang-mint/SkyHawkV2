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

  static async updateCompany() {}

  static async deleteComapny(companyId) {
    const rsp = await basicService.deleteRequest("/company/list", {
      id: companyId
    });
    return rsp;
  }
}

export default companyService;

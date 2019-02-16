import basicService from "./BasicService";
import message from "../utils/Message";
import store from "../store/store";

class companyService {
  static async createCompany() {}

  static async getCompanyList() {
    const rsp = await basicService.getRequest("/company/list");
    return rsp;
  }

  static async getCompanyDetail() {}

  static async updateCompany() {}

  static async deleteComapny() {}
}

export default companyService;

import basicService from "./BasicService";
import message from "../utils/Message";
import store from "../store/store";
import qs from "qs";

class userService {
  static async createUser(newUser) {
    const rsp = await basicService.postRequest(
      "/user/list",
      qs.stringify(newUser)
    );
    message.snackbar(rsp.msg);
    return rsp;
  }

  static async getUserList(query) {
    const rsp = await basicService.getRequest("/user/list", query);
    return rsp;
  }

  static async updateUser(userInfo) {
    const rsp = await basicService.putRequest("/user/info", userInfo);
    message.snackbar(rsp.msg);
    return rsp;
  }

  static async deleteUser(query) {
    const rsp = await basicService.deleteRequest("/user/list", query);
    message.snackbar(rsp.msg);
    return rsp;
  }
}

export default userService;

import basicService from "./BasicService";
import message from "../utils/Message";
import store from "../store/store";
import { userInfo } from "os";

class userService {
  static async createUser(newUser) {
    console.log(newUser);
    const rsp = await basicService.postRequest("/user/list", {
      username: newUser.username,
      name: newUser.name,
      phone: newUser.phone,
      role: newUser.role,
      company: newUser.company,
      organization: newUser.organization
    });
    message.snackbar(rsp.msg);
    return rsp;
  }

  static async getUserList(query) {
    const rsp = await basicService.getRequest("/user/list", query);
    return rsp;
  }

  static async updateUser(userInfo) {
    const rsp = await basicService.putRequest("/user/info", {
      userInfo: userInfo
    });
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

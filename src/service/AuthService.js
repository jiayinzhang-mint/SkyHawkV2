import basicService from "./BasicService";
import message from "../utils/message";
import store from "../store/store";

class authService {
  static async login(username, password) {
    const rsp = await basicService.postRequest("/user/login", {
      username: username,
      password: password
    });
    message.snackbar(rsp.msg);
    return rsp;
  }
}

export default authService;

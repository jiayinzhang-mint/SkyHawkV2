import basicService from "./BasicService";
import message from "../utils/Message";
import detectDevice from "../utils/DetectDevice";
import store from "../store/store";

class authService {
  static async login(username, password) {
    const rsp = await basicService.postRequest("/user/login", {
      username: username,
      password: password
    });
    message.snackbar(rsp.msg);
    if (rsp.msg == "success") {
      var userInfo = {};
      userInfo = rsp;
      userInfo.device = detectDevice();
      store.dispatch("user/login", userInfo);
    }
    return rsp;
  }
}

export default authService;

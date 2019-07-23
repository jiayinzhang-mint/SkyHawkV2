import axios from "axios";
import store from "../store/store";

class basicService {
  static async getData(rsp) {
    store.commit("others/toggleLoading", true);
    var rspData = rsp;
    if (rsp.data) rspData = rsp.data;
    store.commit("others/toggleLoading", false);
    // err => no data
    return rspData;
  }

  static async getRequest(url, params) {
    store.commit("others/toggleLoading", true);

    try {
      var rsp = await axios.get(url, { params: params });
    } catch (err) {
      return err;
    }
    let json = rsp.data;
    let msg = { url: url, params: params, rsp: json };
    console.log(msg);
    store.commit("others/toggleLoading", false);

    return this.getData(rsp);
  }

  static async postRequest(url, params) {
    store.commit("others/toggleLoading", true);

    try {
      var rsp = await axios.post(url, params);
    } catch (err) {
      return await this.getData(err);
    }
    let json = rsp.data;
    let msg = { url: url, params: params, rsp: json };
    console.log(msg);
    store.commit("others/toggleLoading", false);

    return await this.getData(rsp);
  }

  static async putRequest(url, params) {
    store.commit("others/toggleLoading", true);

    try {
      var rsp = await axios.put(url, params);
    } catch (err) {
      return err;
    }
    let json = rsp.data;
    let msg = { url: url, params: params, rsp: json };
    console.log(msg);
    store.commit("others/toggleLoading", false);

    return this.getData(rsp);
  }

  static async deleteRequest(url, params) {
    store.commit("others/toggleLoading", true);

    try {
      var rsp = await axios.delete(url, { params: params });
    } catch (err) {
      return err;
    }
    let json = rsp.data;
    let msg = { url: url, params: params, rsp: json };
    console.log(msg);
    store.commit("others/toggleLoading", false);

    return this.getData(rsp);
  }
}

export default basicService;

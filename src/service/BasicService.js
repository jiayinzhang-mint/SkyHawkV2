import axios from "axios";
import Vue from "vue";
const vue = new Vue();

class basicService {
  static async getData(rsp) {
    vue.$loading.show(true);
    var rspData = rsp;
    if (rsp.data) rspData = rsp.data;
    vue.$loading.show(false);
    // err => no data
    return rspData;
  }

  static async getRequest(url, params) {
    vue.$loading.show(true);

    try {
      var rsp = await axios.get(url, { params: params });
    } catch (err) {
      return err;
    }
    let json = rsp.data;
    let msg = { url: url, params: params, rsp: json };
    console.log(msg);
    vue.$loading.show(false);

    return this.getData(rsp);
  }

  static async postRequest(url, params) {
    vue.$loading.show(true);

    try {
      var rsp = await axios.post(url, params);
    } catch (err) {
      return await this.getData(err);
    }
    let json = rsp.data;
    let msg = { url: url, params: params, rsp: json };
    console.log(msg);
    vue.$loading.show(false);

    return await this.getData(rsp);
  }

  static async putRequest(url, params) {
    vue.$loading.show(true);

    try {
      var rsp = await axios.put(url, params);
    } catch (err) {
      return err;
    }
    let json = rsp.data;
    let msg = { url: url, params: params, rsp: json };
    console.log(msg);
    vue.$loading.show(false);

    return this.getData(rsp);
  }

  static async deleteRequest(url, params) {
    vue.$loading.show(true);

    try {
      var rsp = await axios.delete(url, { params: params });
    } catch (err) {
      return err;
    }
    let json = rsp.data;
    let msg = { url: url, params: params, rsp: json };
    console.log(msg);
    vue.$loading.show(false);

    return this.getData(rsp);
  }
}

export default basicService;

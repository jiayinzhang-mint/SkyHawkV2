import store from "../store";
const state = {
  alertList: [],
  // back end pagination
  alertPage: 1,
  alertDetail: {},
  alertStatistic: {
    unprocessedAlertCount: ""
  },
  alertTypeArr: [
    {
      type: 0,
      name: "帽子未带"
    },
    {
      type: 1,
      name: "口罩未带"
    },
    {
      type: 2,
      name: "鼠患"
    },
    {
      type: 3,
      name: "定时抓图"
    },
    {
      type: 4,
      name: "异常人员"
    },
    {
      type: 5,
      name: "服装不规范"
    }
  ],
  alertStateArr: []
};

const getters = {
  alertList: state => {
    return state.alertList;
  },
  alertPage: state => {
    return state.alertPage;
  },
  alertDetail: state => {
    return state.alertDetail;
  },
  alertStatistic: state => {
    return state.alertStatistic;
  },
  alertPageFront: state => {
    return state.alertPageFront;
  },
  alertTypeArr: state => {
    return state.alertTypeArr;
  }
};

const mutations = {
  getAlertList: (state, alertList) => {
    alertList.forEach(e => {
      e.brand = store.getters["company/companyList"].find(company => {
        return company.id == e.company;
      });
    });
    state.alertList = alertList;
    state.alertPage = 1;
  },
  updateAlertList: (state, alertList) => {
    alertList.forEach(e => {
      e.brand = store.getters["company/companyList"].find(company => {
        return company.id == e.company;
      });
      // state.alertList.push(e);
    });
    state.alertList = alertList;
  },
  restoreAlertList: state => {
    state.alertList = [];
    state.alertPage = 1;
  },
  getAlertDetail: (state, alertDetail) => {
    state.alertDetail = alertDetail;
  },
  updateUnprocessedAlert: (state, unprocessedAlertCount) => {
    state.alertStatistic.unprocessedAlertCount = unprocessedAlertCount;
  },
  updateAlertPage: (state, alertPage) => {
    console.log(alertPage);
    state.alertPage += alertPage;
  }
};
const actions = {
  async getAlertList(context, alertList) {
    context.commit("getAlertList", alertList);
  },
  async updateAlertList(context, alertList) {
    context.commit("updateAlertList", alertList);
  },
  async restoreAlertList(context) {
    context.commit("restoreAlertList");
  },
  async getAlertDetail(context, alertDetail) {
    context.commit("getAlertDetail", alertDetail);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

import store from "../store";
const state = {
  alertList: [],
  // back end pagination
  alertPage: 1,
  alertDetail: {},
  alertStatistic: {
    unprocessedAlertCount: ""
  }
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

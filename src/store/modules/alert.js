import store from "../store";
const state = {
  alertList: [],
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
    state.alertPage = 2;
  },
  updateAlertList: (state, alertList) => {
    state.alertPage = state.alertPage + 1;
    alertList.forEach(e => {
      e.brand = store.getters["company/companyList"].find(company => {
        return company.id == e.company;
      });
      state.alertList.push(e);
    });
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

import store from "../store";
const state = {
  alertList: [],
  alertPage: 1
};

const getters = {
  alertList: state => {
    return state.alertList;
  },
  alertPage: state => {
    return state.alertPage;
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

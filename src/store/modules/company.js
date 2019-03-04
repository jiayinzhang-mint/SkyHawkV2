const state = {
  companyList: [],
  companyStatistic: {}
};
const getters = {
  companyList: state => {
    return state.companyList;
  }
};
const mutations = {
  getCompanyList: (state, companyList) => {
    state.companyList = companyList;
  }
};
const actions = {
  async getCompanyList(context, companyList) {
    context.commit("getCompanyList", companyList);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

const state = {
  organizationList: [],
  stationList: [],
  organizationStatistic: []
};
const getters = {
  organizationList: state => {
    return state.organizationList;
  },
  stationList: state => {
    return state.stationList;
  },
  organizationStatistic: state => {
    return state.organizationStatistic;
  }
};
const mutations = {
  getOrganizationList: (state, organizationList) => {
    var stationList = [];
    organizationList[1].children.forEach(element => {
      var temp = {};
      temp.id = element.id;
      temp.name = element.name;
      stationList.push(temp);
    });
    state.organizationList = organizationList;
    state.stationList = stationList;
  },
  updateOrganizationStatistic: (state, organizationStatistic) => {
    state.organizationStatistic = organizationStatistic;
  }
};
const actions = {
  async getOrganizationList(context, organizationList) {
    context.commit("getOrganizationList", organizationList);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

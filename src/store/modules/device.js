const state = {
  deviceStatistic: {
    onlineRate: ""
  },
  systemStatistic: {}
};
const getters = {
  deviceStatistic: state => {
    return state.deviceStatistic;
  },
  systemStatistic: state => {
    return state.systemStatistic;
  }
};
const mutations = {
  updateOnlineRate: (state, onlineRate) => {
    state.deviceStatistic.onlineRate = onlineRate;
  },
  updateSystemStatus: (state, systemStatistic) => {
    state.systemStatistic = systemStatistic;
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

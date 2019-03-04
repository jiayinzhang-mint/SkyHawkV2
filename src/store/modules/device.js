const state = {
  deviceStatistic: {
    onlineRate: ""
  }
};
const getters = {
  deviceStatistic: state => {
    return state.deviceStatistic;
  }
};
const mutations = {
  updateOnlineRate: (state, onlineRate) => {
    state.deviceStatistic.onlineRate = onlineRate;
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

const state = {
  userInfo: null,
  userList: [],
  userStatistic: {
    onlineRate: ""
  }
};
const getters = {
  userInfo: state => {
    return state.userInfo;
  },
  userList: state => {
    return state.userList;
  },
  userStatistic: state => {
    return state.userStatistic;
  }
};
const mutations = {
  updateUserInfo: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  updateUserList: (state, userList) => {
    state.userList = userList;
  },
  updateOnlineRate: (state, onlineRate) => {
    state.userStatistic.onlineRate = onlineRate;
  }
};
const actions = {
  async login(context, userInfo) {
    context.commit("updateUserInfo", userInfo);
  },
  async updateUserList(context, userList) {
    context.commit("updateUserList", userList);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

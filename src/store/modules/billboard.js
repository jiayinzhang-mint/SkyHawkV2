const state = {
  postList: []
};
const getters = {
  postList: state => {
    return state.postList;
  }
};
const mutations = {
  getPostList: (state, postList) => {
    state.postList = postList;
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

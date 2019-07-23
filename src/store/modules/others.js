const state = {
  weather: {},
  loading: false
};
const getters = {
  weather: state => {
    return state.weather;
  },
  loading: state => {
    return state.loading;
  }
};
const mutations = {
  getWeather: (state, weather) => {
    state.weather = weather;
  },
  toggleLoading: (state, toggle) => {
    state.loading = toggle;
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

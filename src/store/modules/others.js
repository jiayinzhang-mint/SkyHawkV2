const state = {
  weather: {}
};
const getters = {
  weather: state => {
    return state.weather;
  }
};
const mutations = {
  getWeather: (state, weather) => {
    state.weather = weather;
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

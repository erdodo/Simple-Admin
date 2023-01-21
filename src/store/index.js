import { createStore } from "vuex";

export default createStore({
  state: {
    menu_state: false,
  },
  getters: {
    getMenuState(state) {
      return state.menu_state;
    },
  },
  mutations: {
    setMenuState(state, data) {
      state.menu_state = data;
    },
  },
  actions: {},
  modules: {},
});

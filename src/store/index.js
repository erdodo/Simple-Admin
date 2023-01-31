import { createStore } from "vuex";
import Global from "./global";
export default createStore({
  state: {
    menu_state: false,
    logged_in: false,
  },
  getters: {
    getMenuState(state) {
      return state.menu_state;
    },
    get_logged_in(state) {
      if (localStorage.getItem("logged_in") == "true") {
        return true;
      } else {
        return state.logged_in;
      }
    },
    get_token(state) {
      if (localStorage.getItem("token") != null) {
        return localStorage.getItem("token");
      } else {
        return state.token;
      }
    },
  },
  mutations: {
    setMenuState(state, data) {
      state.menu_state = data;
    },
    set_logged_in(state, data) {
      state.logged_in = data;
      localStorage.setItem("logged_in", "true");
    },
    set_TOKEN(state, data) {
      state.token = data;
    },
  },
  actions: {},
  modules: { Global },
});

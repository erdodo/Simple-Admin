import axios from "axios";
import store from ".";
export default {
  state: {
    dark_theme: true,
    c: {},
  },
  getters: {
    get_dark_theme(state) {
      let localTheme = localStorage.getItem("theme");
      state.dark_theme = localTheme == null || localTheme == "dark";
      return state.dark_theme;
    },
    get_cache(state) {
      if (JSON.parse(localStorage.getItem("cache"))?.time == undefined) {
        return state.c;
      } else {
        return JSON.parse(localStorage.getItem("cache"));
      }
    },
  },
  mutations: {
    changeTheme(state) {
      let newTheme = state.dark_theme ? "light" : "dark";
      state.dark_theme = !state.dark_theme;
      let html = document.getElementById("html");
      html.className = newTheme;
      html.attributes["data-bs-theme"].value = newTheme;
      localStorage.setItem("theme", newTheme);
    },
    set_cache(state, data) {
      state.c = data;
    },
  },
  actions: {
    cache_api(state) {
      const base_url = "https://backend.erdoganyesil.com.tr/";
      state.c = JSON.parse(localStorage.getItem("cache"));

      var config = {
        method: "get",
        url: base_url + "api/v2/front_cache",
        headers: {
          token: store.getters.get_token,
        },
      };
      axios(config)
        .then((res) => {
          localStorage.setItem("cache", JSON.stringify(res.data));
          store.commit("set_cache", res.data);
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};

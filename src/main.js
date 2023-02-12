import { createApp } from "vue";
import Page from "./Page.vue";
import router from "./router";
import store from "./store";

import services from "./services";
import bildir from "./components/bildir.js";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import tr from "element-plus/dist/locale/tr.mjs";
import en from "element-plus/dist/locale/en.mjs";
let locale;
let lang = store.getters.get_cache.profile.language_id.name;
if (lang == "tr") locale = tr;
if (lang == "en") locale = en;
console.log(locale);

import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

const app = createApp(Page);

app.config.globalProperties.services = services;
app.config.globalProperties.bildir = bildir;
app.config.globalProperties.g = store;
app.config.globalProperties.empty = (val) => {
  if (val == "" || val == null || val == undefined || val?.length <= 0 || val == "[]" || val == "{}") return true;
  else return false;
};
app.config.globalProperties.tr = (val) => {
  return store.getters.get_cache.front_langs[val];
};

app.use(store);
app.use(router);

app.use(ElementPlus, {
  locale: locale,
});
app.use(FloatingVue);

app.mount("#app");

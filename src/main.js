import { createApp } from "vue";
import Page from "./Page.vue";
import router from "./router";
import store from "./store";
import services from "./services";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

const app = createApp(Page);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(services);
app.mount("#app");

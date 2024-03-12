import "ant-design-vue/dist/reset.css";
import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import setupAnt from "@/core/ant";
const app = createApp(App);

app.use(router);
setupAnt(app);
app.mount("#app");

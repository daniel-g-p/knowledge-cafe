import { createApp } from "vue";
import App from "./App.vue";

import router from "./router/index.js";

import IconLogo from "./layout/IconLogo.vue";
import BaseButton from "./base/BaseButton.vue";

const app = createApp(App);

app.use(router);

app.component("IconLogo", IconLogo);
app.component("BaseButton", BaseButton);

app.mount("#app");

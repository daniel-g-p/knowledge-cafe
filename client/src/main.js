import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";

import router from "./router/index.js";
import store from "./store/index.js";

const IconLogo = defineAsyncComponent(() => {
  return import("./layout/IconLogo.vue");
});

const BaseModal = defineAsyncComponent(() => {
  return import("./base/BaseModal.vue");
});

const BaseSelect = defineAsyncComponent(() => {
  return import("./base/BaseSelect.vue");
});

const BaseButton = defineAsyncComponent(() => {
  return import("./base/BaseButton.vue");
});

const BaseTitle = defineAsyncComponent(() => {
  return import("./base/BaseTitle.vue");
});

const BaseCard = defineAsyncComponent(() => {
  return import("./base/BaseCard.vue");
});

const BaseTextbox = defineAsyncComponent(() => {
  return import("./base/BaseTextbox.vue");
});

const BaseLink = defineAsyncComponent(() => {
  return import("./base/BaseLink.vue");
});

const BaseInfo = defineAsyncComponent(() => {
  return import("./base/BaseInfo.vue");
});

const app = createApp(App);

app.use(router);
app.use(store);

app.component("IconLogo", IconLogo);
app.component("BaseButton", BaseButton);
app.component("BaseTitle", BaseTitle);
app.component("BaseCard", BaseCard);
app.component("BaseModal", BaseModal);
app.component("BaseSelect", BaseSelect);
app.component("BaseTextbox", BaseTextbox);
app.component("BaseLink", BaseLink);
app.component("BaseInfo", BaseInfo);

app.mount("#app");

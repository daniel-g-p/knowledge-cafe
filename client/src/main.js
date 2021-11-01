import { createApp } from "vue";
import App from "./App.vue";

import router from "./router/index.js";
import store from "./store/index.js";

import IconLogo from "./layout/IconLogo.vue";
import BaseButton from "./base/BaseButton.vue";
import BaseTitle from "./base/BaseTitle.vue";
import BaseCard from "./base/BaseCard.vue";
import BaseModal from "./base/BaseModal.vue";
import BaseSelect from "./base/BaseSelect.vue";
import BaseTextbox from "./base/BaseTextbox.vue";
import BaseLink from "./base/BaseLink.vue";

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

app.mount("#app");

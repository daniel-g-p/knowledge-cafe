import { createRouter, createWebHistory } from "vue-router";

import root from "./root.js";
import shop from "./shop.js";
import account from "./account.js";
import admin from "./admin.js";
import notFound from "./not-found";

export default createRouter({
  history: createWebHistory(),
  routes: [root, shop, account, admin, notFound],
});

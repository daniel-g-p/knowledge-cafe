import { createStore } from "vuex";

import shop from "./shop/index.js";
import authentication from "./authentication/index.js";
import orders from "./orders/index.js";

export default createStore({
  modules: {
    shop,
    authentication,
    orders,
  },
});

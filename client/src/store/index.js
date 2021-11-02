import { createStore } from "vuex";

import shop from "./shop/index.js";
import authentication from "./authentication/index.js";

export default createStore({
  modules: {
    shop,
    authentication,
  },
});

import { createStore } from "vuex";

import shop from "./shop/index.js";

export default createStore({
  modules: {
    shop,
  },
});

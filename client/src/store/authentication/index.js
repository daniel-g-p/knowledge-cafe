import getters from "./getters.js";
import mutations from "./mutations.js";
import actions from "./actions.js";

export default {
  namespaced: true,
  state() {
    return {
      loggedIn: false,
      isAdmin: false,
      name: "",
      email: "",
      username: "",
    };
  },
  getters,
  mutations,
  actions,
};

export default {
  namespaced: true,
  state() {
    return {
      shopItems: [],
      cartItems: [],
    };
  },
  getters: {
    shopItems(state) {
      return state.shopItems;
    },
    cartItems(state) {
      return state.cartItems;
    },
  },
  mutations: {
    fetchItems(state, payload) {
      state.shopItems = payload;
    },
  },
  actions: {},
};

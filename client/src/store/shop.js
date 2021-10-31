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
  actions: {
    fetchItems(context, payload) {
      fetch(`${process.env.VUE_APP_API}/shop`)
        .then((res) => res.json())
        .then((res) => context.commit("fetchItems", res.products))
        .catch((error) => console.log(error));
    },
  },
};

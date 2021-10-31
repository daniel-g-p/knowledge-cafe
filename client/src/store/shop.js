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
    addCartItem(state, payload) {
      const { id, quantity, variation } = payload;
      const index = state.cartItems.findIndex((item) => {
        return item.id === id && item.variation === variation;
      });
      if (index !== -1) {
        state.cartItems[index].quantity += quantity;
      } else {
        state.cartItems.push(payload);
      }
    },
  },
  actions: {
    fetchItems(context, payload) {
      fetch(`${process.env.VUE_APP_API}/shop`)
        .then((res) => res.json())
        .then((res) => context.commit("fetchItems", res.products))
        .catch((error) => console.log(error));
    },
    addCartItem(context, payload) {
      console.log(payload);
      context.commit("addCartItem", payload);
    },
  },
};

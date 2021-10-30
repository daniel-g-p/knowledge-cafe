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
      try {
        fetch(`${process.env.VUE_APP_API}/shop`)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            console.log(res);
            return res;
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};

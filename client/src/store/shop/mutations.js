export default {
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
};

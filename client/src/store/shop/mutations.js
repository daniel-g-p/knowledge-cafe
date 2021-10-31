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
      const { name, price } = state.shopItems.find((item) => item._id === id);
      state.cartItems.push({
        id,
        name,
        quantity,
        price,
        variation,
      });
    }
  },
  removeCartItem(state, payload) {
    const { id, variation } = payload;
    const itemIndex = state.cartItems.findIndex((item) => {
      return item.id === id && item.variation === variation;
    });
    state.cartItems.splice(itemIndex, 1);
  },
};

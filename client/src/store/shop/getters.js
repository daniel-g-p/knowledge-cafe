export default {
  shopItems(state) {
    return state.shopItems;
  },
  cartItems(state) {
    return state.cartItems;
  },
  cartTotal(state) {
    return state.cartItems.reduce((result, cartItem) => {
      const { price } = state.shopItems.find((shopItem) => {
        return shopItem._id === cartItem.id;
      });
      return result + price * cartItem.quantity;
    }, 0);
  },
};

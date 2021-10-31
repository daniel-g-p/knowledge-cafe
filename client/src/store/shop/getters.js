export default {
  shopItems(state) {
    return state.shopItems;
  },
  cartItems(state) {
    return state.cartItems;
  },
  cartTotal(state) {
    const total = state.cartItems.reduce((result, cartItem) => {
      const { price } = state.shopItems.find((shopItem) => {
        return shopItem._id === cartItem.id;
      });
      return result + price * cartItem.quantity;
    }, 0);
    const multiple = (total * 100).toString();
    const { length } = multiple;
    return `€${multiple.slice(0, length - 2)},${multiple.slice(length - 2)}`;
  },
};

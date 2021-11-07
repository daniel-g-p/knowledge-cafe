export default {
  productList(state) {
    return state.productList.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
  },
};

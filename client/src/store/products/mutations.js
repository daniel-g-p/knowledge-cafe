export default {
  fetchProducts(state, productList) {
    state.productList = productList;
  },
  editProduct(state, payload) {
    const { productId, productData } = payload;
    const index = state.productList.findIndex(
      (product) => product._id === productId
    );
    const { name, tag, description, price, variations } = productData;
    state.productList[index].name = name;
    state.productList[index].tag = tag;
    state.productList[index].description = description;
    state.productList[index].price = price;
    state.productList[index].variations = variations;
  },
  newProduct(state, product) {
    state.productList.push(product);
  },
  deleteProduct(state, productId) {
    const index = state.productList.findIndex(
      (product) => product._id === productId
    );
    state.productList.splice(index, 1);
  },
};

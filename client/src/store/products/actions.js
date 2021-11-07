export default {
  fetchProducts(context) {
    fetch(`${process.env.VUE_APP_API}/products`, { credentials: "include" })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          context.commit("fetchProducts", res.products);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  editProduct(context, payload) {
    context.commit("editProduct", payload);
  },
  newProduct(context, payload) {
    const { productId, productData } = payload;
    const _id = productId;
    const { name, tag, description, price, variations } = productData;
    const stats = { revenue: 0, unitsSold: 0, variations: {} };
    const product = { _id, name, tag, description, price, variations, stats };
    context.commit("newProduct", product);
  },
  deleteProduct(context, productId) {
    context.commit("deleteProduct", productId);
  },
};

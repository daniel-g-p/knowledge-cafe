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
};

export default {
  fetchItems(context, payload) {
    fetch(`${process.env.VUE_APP_API}/shop`)
      .then((res) => res.json())
      .then((res) => context.commit("fetchItems", res.products))
      .catch((error) => console.log(error));
  },
  addCartItem(context, payload) {
    context.commit("addCartItem", payload);
  },
};

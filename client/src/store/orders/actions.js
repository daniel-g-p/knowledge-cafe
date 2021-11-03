export default {
  fetchOrders(context) {
    fetch(`${process.env.VUE_APP_API}/orders/pending`);
  },
};

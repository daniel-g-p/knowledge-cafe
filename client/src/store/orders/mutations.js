export default {
  fetchOrders(state, payload) {
    state.pendingOrders = payload;
  },
  completeOrder(state, payload) {
    console.log(payload);
  }
};

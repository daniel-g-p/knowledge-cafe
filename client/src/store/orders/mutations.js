export default {
  fetchOrders(state, payload) {
    state.pendingOrders = payload;
  },
};

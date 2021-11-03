export default {
  fetchOrders(state, payload) {
    console.log(payload);
    state.pendingOrders = payload;
  },
};

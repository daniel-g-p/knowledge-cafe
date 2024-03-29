export default {
  fetchOrders(state, payload) {
    state.pendingOrders = payload;
  },
  completeOrder(state, payload) {
    const index = state.pendingOrders.findIndex(
      (order) => order._id === payload
    );
    state.pendingOrders.splice(index, 1);
  },
  setEventStatus(state, eventStatus) {
    state.eventStatus = eventStatus;
  },
};

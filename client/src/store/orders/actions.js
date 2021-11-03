export default {
  fetchOrders(context) {
    fetch(`${process.env.VUE_APP_API}/orders/pending`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("REQUEST");
        const { orders, event } = res;
        context.commit("setEventStatus", event ? "active" : "inactive");
        context.commit("fetchOrders", event ? orders : []);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  completeOrder(context, orderId) {
    context.commit("completeOrder", orderId);
  },
  toggleEventStatus(context, eventActive) {
    context.commit("setEventStatus", eventActive ? "inactive" : "active");
  },
};

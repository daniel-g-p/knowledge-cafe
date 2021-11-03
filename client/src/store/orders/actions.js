export default {
  fetchOrders(context) {
    fetch(`${process.env.VUE_APP_API}/orders/pending`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        const { orders } = res;
        if (!orders) {
          console.log(res);
        } else {
          context.commit("fetchOrders", orders);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

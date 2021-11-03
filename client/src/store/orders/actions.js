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
  completeOrder(context, orderId) {
    const requestOptions = {
      method: "POST",
      credentials: "include",
    };
    fetch(
      `${process.env.VUE_APP_API}/orders/complete/${orderId}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

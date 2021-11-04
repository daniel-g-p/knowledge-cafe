export default {
  fetchEvents(context) {
    fetch(`${process.env.VUE_APP_API}/events`, { credentials: "include" })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          context.commit("fetchEvents", res.events);
        } else {
          console.log(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

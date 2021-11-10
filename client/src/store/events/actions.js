export default {
  fetchEvents(context) {
    fetch(`${process.env.VUE_APP_API}/events`, { credentials: "include" })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          context.commit("fetchEvents", res.events);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

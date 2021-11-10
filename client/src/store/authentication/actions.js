export default {
  login(context) {
    context.commit("login");
  },
  fetchUserData(context) {
    fetch(`${process.env.VUE_APP_API}/account/user`, { credentials: "include" })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          context.commit("fetchUserData", res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  updateUserData(context, payload) {
    context.commit("updateUserData", payload);
  },
};

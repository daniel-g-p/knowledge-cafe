export default {
  login(context) {
    context.commit("login");
  },
  fetchUserData(context) {
    fetch(`${process.env.VUE_APP_API}/account/user`, { credentials: "include" })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          context.commit("fetchUserData", res);
        } else {
          console.log(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

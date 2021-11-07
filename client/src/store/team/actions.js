export default {
  fetchTeamMembers(context) {
    const url = `${process.env.VUE_APP_API}/team`;
    const options = { credentials: "include" };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          context.commit("fetchTeamMembers", res.team);
          console.log(res);
        } else {
          console.log(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

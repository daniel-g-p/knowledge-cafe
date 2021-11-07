export default {
  login(state) {
    state.loggedIn = true;
  },
  fetchUserData(state, payload) {
    const { name, email, username, role } = payload;
    state.name = name;
    state.email = email;
    state.username = username;
    state.isAdmin = role === "admin";
  },
  updateUserData(state, payload) {
    const { name, email, username } = payload;
    state.name = name;
    state.email = email;
    state.username = username;
  },
};

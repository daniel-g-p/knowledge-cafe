export default {
  loggedIn(state) {
    return state.loggedIn;
  },
  userData(state) {
    const { name, email, username, isAdmin } = state;
    return { name, email, username, isAdmin };
  },
};

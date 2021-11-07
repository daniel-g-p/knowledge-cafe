export default {
  teamMembers(state) {
    return state.teamMembers.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });
  },
};

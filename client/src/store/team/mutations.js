export default {
  fetchTeamMembers(state, payload) {
    state.teamMembers = payload;
  },
  updateRole(state, payload) {
    const { id, role } = payload;
    const index = state.teamMembers.findIndex((member) => member._id === id);
    state.teamMembers[index].role = role;
  },
  removeMember(state, payload) {
    const id = payload;
    const index = state.teamMembers.findIndex((member) => member._id === id);
    state.teamMembers.splice(index, 1);
  },
};

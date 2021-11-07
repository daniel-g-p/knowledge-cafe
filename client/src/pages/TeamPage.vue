<template>
  <section class="team">
    <base-title>Team</base-title>
    <div class="team__list">
      <team-member
        v-for="member in teamMembers"
        :key="member._id"
        :id="member._id"
        :name="member.name"
        @select-member="selectTeamMember"
      ></team-member>
    </div>
    <base-modal
      :open="viewMode ? true : false"
      :title="modalTitle"
      @closeModal="closeModal"
    >
      <team-member-details
        v-if="viewMode === 'view'"
        :name="active.name"
        :email="active.email"
        :role="active.role"
        :timestamp="active.timestamp"
      ></team-member-details>
      <team-member-edit
        v-if="viewMode === 'edit'"
        :id="active.id"
        :role="active.role"
        @form-success="updateRole"
      ></team-member-edit>
    </base-modal>
  </section>
</template>

<script>
import TeamMember from "../components/TeamMember.vue";
import TeamMemberDetails from "../components/TeamMemberDetails.vue";
import TeamMemberEdit from "../components/TeamMemberEdit.vue";

export default {
  components: {
    TeamMember,
    TeamMemberDetails,
    TeamMemberEdit,
  },
  data() {
    return {
      viewMode: "",
      active: {
        id: "",
        name: "",
        email: "",
        username: "",
        role: "",
        timestamp: "",
      },
    };
  },
  computed: {
    teamMembers() {
      return this.$store.getters["team/teamMembers"];
    },
    modalTitle() {
      switch (this.viewMode) {
        case "view": {
          return "Info";
        }
        case "edit": {
          return "Status";
        }
        case "delete": {
          return "Mitglied entfernen?";
        }
        case "error": {
          return "Fehler";
        }
      }
    },
  },
  methods: {
    selectTeamMember(mode, memberId) {
      const teamMember = this.teamMembers.find((member) => {
        return member._id === memberId;
      });
      this.active.id = teamMember._id;
      this.active.name = teamMember.name;
      this.active.email = teamMember.email;
      this.active.username = teamMember.username;
      this.active.role = teamMember.role;
      this.active.timestamp = teamMember.timestamp;
      this.viewMode = mode;
    },
    closeModal() {
      this.viewMode = "";
    },
    updateRole(role) {
      this.active.role = role;
      this.closeModal();
      setTimeout(() => {
        this.viewMode = "view";
      }, 500);
    },
  },
  mounted() {
    if (!this.teamMembers.length) {
      this.$store.dispatch("team/fetchTeamMembers");
    }
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.team {
  &__list {
    display: grid;
    gap: 1rem;
  }
}
</style>

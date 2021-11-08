<template>
  <section class="team">
    <base-title>Team</base-title>
    <div class="team__nav">
      <base-button @click="openNewMemberForm">Neues Mitglied</base-button>
    </div>
    <transition-group tag="div" name="team__member-" class="team__list">
      <team-member
        v-for="member in teamMembers"
        :key="member._id"
        :id="member._id"
        :name="member.name"
        @select-member="selectTeamMember"
      ></team-member>
    </transition-group>
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
        v-else-if="viewMode === 'edit'"
        :id="active.id"
        :role="active.role"
        @form-success="updateRole"
      ></team-member-edit>
      <team-member-delete
        v-else-if="viewMode === 'delete'"
        :id="active.id"
        :name="active.name"
        @form-success="closeModal"
      ></team-member-delete>
      <team-member-new
        v-else-if="viewMode === 'new'"
        @form-success="closeModal"
        @form-failed="emitError"
      ></team-member-new>
      <p class="team__error" v-else-if="viewMode === 'error'">
        {{ modalError }}
      </p>
    </base-modal>
  </section>
</template>

<script>
import TeamMember from "../components/TeamMember.vue";
import TeamMemberDetails from "../components/TeamMemberDetails.vue";
import TeamMemberEdit from "../components/TeamMemberEdit.vue";
import TeamMemberDelete from "../components/TeamMemberDelete.vue";
import TeamMemberNew from "../components/TeamMemberNew.vue";

export default {
  components: {
    TeamMember,
    TeamMemberDetails,
    TeamMemberEdit,
    TeamMemberDelete,
    TeamMemberNew,
  },
  data() {
    return {
      viewMode: "",
      modalError: "",
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
          return "Mitglied entfernen";
        }
        case "new": {
          return "Neues Mitglied";
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
    openNewMemberForm() {
      this.viewMode = "new";
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
    emitError(message) {
      this.viewMode = "";
      this.modalError = message || "Ein Fehler ist aufgetreten.";
      setTimeout(() => {
        this.viewMode = "error";
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
  &__member {
    &--leave-active {
      transition: opacity 0.5s ease;
    }
    &--leave-from {
      opacity: 1;
    }
    &--leave-to {
      opacity: 0;
    }
  }
  &__nav {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 0.125rem solid $color-grey-light;
  }
  &__error {
    line-height: 1.25;
  }
}
</style>

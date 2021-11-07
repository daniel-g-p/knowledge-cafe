<template>
  <section class="team">
    <base-title>Team</base-title>
    <div class="team__list">
      <team-member
        v-for="member in teamMembers"
        :key="member._id"
        :id="member._id"
        :name="member.name"
      ></team-member>
    </div>
  </section>
</template>

<script>
import TeamMember from "../components/TeamMember.vue";

export default {
  components: {
    TeamMember,
  },
  computed: {
    teamMembers() {
      return this.$store.getters["team/teamMembers"];
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

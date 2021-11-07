<template>
  <section class="settings">
    <base-title>Einstellungen</base-title>
    <div class="settings__info">
      <base-info label="Name">{{ userData.name }}</base-info>
      <base-info label="Emailaddresse">{{ userData.email }}</base-info>
      <base-info label="Benutzername">{{ userData.username }}</base-info>
      <base-info label="Rolle">{{ userData.isAdmin ? "Administrator" : "Mitglied" }}</base-info>
    </div>
    <div class="settings__buttons">
      <base-button>Bearbeiten</base-button>
      <base-button>Passwort ändern</base-button>
      <base-button>Abmelden</base-button>
    </div>
    <base-modal :open="viewMode ? true : false"></base-modal>
  </section>
</template>

<script>
export default {
  data() {
    return {
      viewMode: "",
    };
  },
  computed: {
    userData() {
      return this.$store.getters["authentication/userData"];
    },
  },
  mounted() {
    const { name, email, username, isAdmin } = this.userData;
    if (!name || !email || !username || !role) {
      this.$store.dispatch("authentication/fetchUserData");
    }
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.settings {
  &__info {
    display: grid;
    gap: 1rem;
  }
  &__buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 0.125rem solid $color-grey-light;
  }
}
</style>

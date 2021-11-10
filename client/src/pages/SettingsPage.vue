<template>
  <section class="settings">
    <base-title>Einstellungen</base-title>
    <div class="settings__info">
      <base-info label="Name">{{ userData.name }}</base-info>
      <base-info label="Emailaddresse">{{ userData.email }}</base-info>
      <base-info label="Benutzername">{{ userData.username }}</base-info>
      <base-info label="Rolle">{{
        userData.isAdmin ? "Administrator" : "Mitglied"
      }}</base-info>
    </div>
    <div class="settings__buttons">
      <base-button @click="setView('edit')">Bearbeiten</base-button>
      <base-button @click="setView('password')">Passwort ändern</base-button>
      <base-button @click="setView('logout')">Abmelden</base-button>
    </div>
    <base-modal
      :open="viewMode ? true : false"
      :title="modalTitle"
      @close-modal="closeModal"
    >
      <settings-form
        v-if="viewMode === 'edit'"
        :name="userData.name"
        :email="userData.email"
        :username="userData.username"
        @form-success="closeModal"
        @form-failed="emitError"
      ></settings-form>
      <settings-password-edit
        v-else-if="viewMode === 'password'"
        @form-failed="emitError"
      ></settings-password-edit>
      <settings-logout v-else-if="viewMode === 'logout'"></settings-logout>
      <p v-else-if="viewMode === 'error'" class="settings__error">
        {{ modalError }}
      </p>
    </base-modal>
  </section>
</template>

<script>
import SettingsForm from "../components/SettingsForm.vue";
import SettingsPasswordEdit from "../components/SettingsPasswordEdit.vue";
import SettingsLogout from "../components/SettingsLogout.vue";

export default {
  components: {
    SettingsForm,
    SettingsPasswordEdit,
    SettingsLogout,
  },
  data() {
    return {
      viewMode: "",
      modalError: "",
    };
  },
  computed: {
    userData() {
      return this.$store.getters["authentication/userData"];
    },
    modalTitle() {
      switch (this.viewMode) {
        case "edit": {
          return "Bearbeiten";
        }
        case "password": {
          return "Passwort ändern";
        }
        case "logout": {
          return "Abmelden";
        }
        case "error": {
          return "Fehler";
        }
      }
    },
  },
  methods: {
    setView(mode) {
      this.viewMode = mode;
    },
    closeModal() {
      this.viewMode = "";
    },
    emitError(message) {
      this.closeModal();
      setTimeout(() => {
        this.viewMode = "error";
        this.modalError = message || "Ein Fehler is aufgetreten.";
      }, 500);
    },
  },
  mounted() {
    const { name, email, username } = this.userData;
    if (name === "N/A" || !email === "N/A" || !username === "N/A") {
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
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  &__error {
    line-height: 1.25;
  }
}
</style>

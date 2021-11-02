<template>
  <form class="form" @submit.prevent="submitForm">
    <base-title>Login</base-title>
    <base-textbox
      label="Benutzer"
      id="user"
      :error="errors.user"
      v-model="user"
      @remove-error="removeError('user')"
    ></base-textbox>
    <base-textbox
      label="Passwort"
      id="password"
      type="password"
      :error="errors.password"
      v-model="password"
      @remove-error="removeError('password')"
    ></base-textbox>
    <base-button :loading="buttonLoading">Einloggen</base-button>
    <base-link
      class="form__link"
      label="Passwort vergessen?"
      :link="resetPasswordLink"
    ></base-link>
  </form>
  <base-modal title="Fehler" :open="modal.open" @close-modal="closeModal">{{
    modal.message
  }}</base-modal>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      password: "",
      resetPasswordLink: { name: "forgot-password" },
      buttonLoading: false,
      errors: {
        user: false,
        password: false,
      },
      modal: {
        open: false,
        message: "",
      },
    };
  },
  methods: {
    removeError(field) {
      this.errors[field] = false;
    },
    openModal(message) {
      if (message) {
        this.modal.message = message;
      }
      this.modal.open = true;
    },
    closeModal() {
      this.modal.open = false;
    },
    validateForm() {
      if (!this.user) {
        this.errors.user = true;
      }
      if (!this.password) {
        this.errors.password = true;
      }
      return this.user && this.password;
    },
    submitForm() {
      if (!this.validateForm()) {
        return;
      }
      const data = { user: this.user, password: this.password };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      };
      this.buttonLoading = true;
      fetch(`${process.env.VUE_APP_API}/account/login`, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.status !== 200) {
            this.openModal(res.message);
          } else {
            this.$store.dispatch("authentication/login");
            this.$router.push("/admin");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  &__link {
    align-self: center;
    margin-top: 1.5rem;
  }
}
</style>

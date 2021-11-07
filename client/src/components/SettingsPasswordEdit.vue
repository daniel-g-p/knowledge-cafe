<template>
  <form class="form" @submit.prevent="submitForm">
    <base-textbox
      label="Altes Passwort"
      id="oldPassword"
      type="password"
      :error="errors.oldPassword"
      v-model="oldPassword"
      @remove-error="removeError('oldPassword')"
    ></base-textbox>
    <base-textbox
      label="Neues Passwort"
      id="newPassword"
      type="password"
      :error="errors.newPassword"
      error-message="Mindestens 1 Großbuchstabe, 1 Kleinbuchstabe, 1 Zahl, und 1 Sonderzeichen erforderlich."
      v-model="newPassword"
      @remove-error="removeError('newPassword')"
    ></base-textbox
    ><base-textbox
      label="Passwort bestätigen"
      id="confirmPassword"
      type="password"
      :error="errors.confirmPassword"
      error-message="Die Passwörter stimmen nicht überein."
      v-model="confirmPassword"
      @remove-error="removeError('confirmPassword')"
    ></base-textbox>
    <base-button :loading="buttonLoading">Ändern</base-button>
  </form>
</template>

<script>
export default {
  emits: ["form-failed"],
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      errors: {
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
      },
      buttonLoading: false,
    };
  },
  methods: {
    removeError(field) {
      this.errors[field] = false;
    },
    validateForm() {
      const errors = [];
      if (!this.oldPassword) {
        this.errors.oldPassword = true;
        errors.push("oldPassword");
      }
      const passwordRegex =
        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[._\-!?@#$%^&+=])./;
      if (!this.newPassword || !passwordRegex.test(this.newPassword)) {
        this.errors.newPassword = true;
        errors.push("newPassword");
      } else if (this.confirmPassword !== this.newPassword) {
        this.errors.confirmPassword = true;
        errors.push("confirmPassword");
      }
      return errors.length ? false : true;
    },
    submitForm() {
      const valid = this.validateForm();
      if (!valid) {
        return;
      }
      const data = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      };
      const url = `${process.env.VUE_APP_API}/account/change-password`;
      const options = {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      this.buttonLoading = true;
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            this.$router.push({ name: "login" });
          } else {
            this.$emit("form-failed", res.message);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$emit("form-failed");
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>

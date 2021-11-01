<template>
  <form class="form">
    <base-title>Login</base-title>
    <base-textbox label="Benutzer" id="user" v-model="user"></base-textbox>
    <base-textbox
      label="Passwort"
      id="password"
      type="password"
      v-model="password"
    ></base-textbox>
    <base-button>Einloggen</base-button>
    <base-link
      class="form__link"
      label="Passwort vergessen?"
      :link="resetPasswordLink"
    ></base-link>
  </form>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      password: "",
      resetPasswordLink: { name: "forgot-password" },
    };
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

<template>
  <div class="logout">
    <p>Möchtest du dich aus deinem Konto ausloggen?</p>
    <base-button :loading="buttonLoading" @click="logout">Abmelden</base-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonLoading: false,
    };
  },
  methods: {
    logout() {
      const options = { credentials: "include" };
      this.buttonLoading = true;
      fetch(`${process.env.VUE_APP_API}/account/logout`, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            this.$router.push({ name: "login" });
          } else {
            this.$emit("logout-failed");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$emit("logout-failed");
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

.logout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>

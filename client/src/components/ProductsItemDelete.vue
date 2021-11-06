<template>
  <p class="message">
    Sicher, dass du das Produkt "{{ name }}" aus dem System löschen möchtest?
    Alle daran gebundenen Daten werden ebenfalls gelöscht, die Eventstatistiken
    bleiben erhalten.
  </p>
  <base-button :loading="buttonLoading" @click="deleteProduct"
    >Bestätigen</base-button
  >
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  emits: ["confirm-deletion", "deletion-failed"],
  data() {
    return {
      buttonLoading: false,
    };
  },
  methods: {
    deleteProduct() {
      const url = `${process.env.VUE_APP_API}/products/${this.id}`;
      const options = { credentials: "include", method: "DELETE" };
      this.buttonLoading = true;
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            this.$emit("confirm-deletion", this.id);
          } else {
            this.$emit("deletion-failed", res.message);
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
.message {
  line-height: 1.25;
}
</style>

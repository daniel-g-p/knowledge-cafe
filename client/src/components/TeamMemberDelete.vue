<template>
  <p class="message">
    Sicher, dass du {{ name }} von der Mitgliederliste entfernen möchstest?
  </p>
  <base-button :loading="buttonLoading" @click="deleteMember"
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
  emits: ["form-success", "form-failed"],
  data() {
    return {
      buttonLoading: false,
    };
  },
  methods: {
    deleteMember() {
      const url = `${process.env.VUE_APP_API}/team/${this.id}`;
      const options = { credentials: "include", method: "DELETE" };
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            this.$store.dispatch("team/removeMember", this.id);
            this.$emit("form-success");
          } else {
            this.$emit("form-failed", res.message);
          }
        })
        .catch((error) => {
          consle.log(error);
          this.$emit("form-failed");
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

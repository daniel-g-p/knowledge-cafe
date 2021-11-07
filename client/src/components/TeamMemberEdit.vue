<template>
  <base-select
    name="Status"
    :options="options"
    v-model="formRole"
  ></base-select>
  <base-button :loading="buttonLoading" @click="setStatus"
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
    role: {
      type: String,
      required: true,
    },
  },
  emits: ["form-success", "form-failed"],
  data() {
    return {
      buttonLoading: false,
      formRole: "",
      options: [
        { id: "admin", label: "Administrator" },
        { id: "user", label: "Mitglied" },
      ],
    };
  },
  methods: {
    setStatus() {
      if (this.role === this.formRole) {
        this.$emit("form-success", this.role);
      } else {
        const url = `${process.env.VUE_APP_API}/team/set-role/${this.id}`;
        const options = {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: this.formRole }),
        };
        this.buttonLoading = true;
        fetch(url, options)
          .then((res) => res.json())
          .then((res) => {
            if (res.ok) {
              const payload = { id: this.id, role: this.formRole };
              this.$store.dispatch("team/updateRole", payload);
              this.$emit("form-success", this.formRole);
            } else {
              this.$emit("form-failed");
            }
          })
          .catch((error) => {
            console.log(error);
            this.$emit("form-failed");
          })
          .finally(() => {
            this.buttonLoading = false;
          });
      }
    },
  },
  mounted() {
    this.formRole = this.role;
  },
};
</script>

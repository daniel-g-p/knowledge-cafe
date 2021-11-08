<template>
  <base-textbox
    label="Emailadresse"
    id="email"
    :error="errors.email"
    v-model="email"
    @remove-error="removeError('email')"
  ></base-textbox>
  <base-select
    name="Status"
    :options="roleOptions"
    :error="errors.role"
    v-model="role"
    @remove-error="removeError('role')"
  ></base-select>
  <base-button :loading="buttonLoading" @click="submitForm"
    >Bestätigen</base-button
  >
</template>

<script>
export default {
  emits: ["form-success", "form-failed"],
  data() {
    return {
      buttonLoading: false,
      email: "",
      role: "user",
      roleOptions: [
        { label: "Mitglied", id: "user" },
        { label: "Administrator", id: "admin" },
      ],
      errors: {
        email: false,
        role: false,
      },
    };
  },
  methods: {
    removeError(field) {
      this.errors[field] = false;
    },
    submitForm() {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!this.email || !emailRegex.test(this.email)) {
        this.errors.email = true;
      }
      if (!this.role) {
        this.errors.role = true;
      }
      if (this.errors.email || this.errors.role) {
        return;
      }
      const url = `${process.env.VUE_APP_API}/team`;
      const options = {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.email, role: this.role }),
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            this.$emit("form-success", this.email);
          } else {
            this.$emit("form-failed", res.message);
          }
        })
        .catch((error) => {
          this.$emit("form-failed", res.message);
          console.log(error);
        });
    },
  },
};
</script>

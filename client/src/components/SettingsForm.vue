<template>
  <form class="settings__form" @submit.prevent="submitEdits">
    <base-textbox
      label="Name"
      id="name"
      :error="errors.name"
      error-message="Bitte gebe deinen Namen ein."
      v-model="form.name"
      @remove-error="removeError('name')"
    ></base-textbox>
    <base-textbox
      label="Emailadresse"
      id="email"
      :error="errors.email"
      error-message="Ungültige Emailadresse"
      v-model="form.email"
      @remove-error="removeError('email')"
    ></base-textbox>
    <base-textbox
      label="Benutzername"
      id="username"
      :error="errors.username"
      error-message="Ungültiger Benutzername"
      v-model="form.username"
      @remove-error="removeError('username')"
    ></base-textbox>
    <base-button :loading="buttonLoading">Bestätigen</base-button>
  </form>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  emits: ["form-success", "form-failed"],
  data() {
    return {
      buttonLoading: false,
      form: {
        name: "",
        email: "",
        username: "",
      },
      errors: {
        name: false,
        email: false,
        username: false,
      },
    };
  },
  methods: {
    removeError(field) {
      this.errors[field] = false;
    },
    validateEdits() {
      const { name, email, username, isAdmin } = this.form;
      const errors = [];
      if (!name) {
        this.errors.name = true;
        errors.push("name");
      }
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email || !emailRegex.test(email)) {
        this.errors.email = true;
        errors.push("email");
      }
      const usernameRegex = /^[a-zA-Z0-9._-]+$/;
      if (!username || !usernameRegex.test(username)) {
        this.errors.username = true;
        errors.push("username");
      }
      return errors.length ? false : true;
    },
    submitEdits() {
      const valid = this.validateEdits();
      if (!valid) {
        return;
      }
      const data = {
        name: this.form.name,
        email: this.form.email.toLowerCase(),
        username: this.form.username.toLowerCase(),
      };
      const url = `${process.env.VUE_APP_API}/account/user`;
      const options = {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      this.buttonLoading = true;
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            this.$emit("form-success");
            this.$store.dispatch("authentication/updateUserData", data);
          } else {
            this.$emit("form-failed", res.message);
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
  mounted() {
    this.form.name = this.name;
    this.form.email = this.email;
    this.form.username = this.username;
  },
};
</script>

<template>
  <base-info label="Name">{{ name }}</base-info>
  <base-info label="Emailadresse">{{ email }}</base-info>
  <base-info label="Status">{{ formattedRole }}</base-info>
  <base-info label="Mitglied seit">{{ formattedDate }}</base-info>
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
    role: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
  },
  computed: {
    formattedRole() {
      return this.role === "admin" ? "Administrator" : "Mitglied";
    },
    formattedDate() {
      const date = new Date(this.timestamp);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
  },
};
</script>

<template>
  <router-link class="link" :to="link">{{ label }}</router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.link {
  color: $color-grey-medium;
  transition: color 0.25s ease;
  &:hover,
  &:focus {
    color: darken($color-grey-medium, 25);
  }
}
</style>

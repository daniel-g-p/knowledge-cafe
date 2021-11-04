<template>
  <div class="info">
    <div class="info__label">{{ label }}</div>
    <div class="info__value"><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.info {
  &__label {
    color: $color-gold;
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }
  &__value {
    font-weight: 700;
  }
}
</style>

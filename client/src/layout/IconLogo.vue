<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 108 144"
    :style="logoHeight"
    class="logo"
    :class="logoClass"
  >
    <path
      class="logo__left"
      d="M51.17,74.83C42.19,65.84,32,55.64,32,36A57.24,57.24,0,0,1,40.6,5.79a2,2,0,0,0-1.7-3,2.14,2.14,0,0,0-.73.14C16.07,11.4,0,37.46,0,70.56c0,39.6,23,71.86,51.8,73.44h.11a2,2,0,0,0,1.48-.66C61,135,68,123.16,68,108,68,91.68,59.83,83.5,51.17,74.83Zm-.93,63c-11.39-1.26-22.07-8.22-30.24-19.78C11,105.32,6,88.44,6,70.56c0-23.88,9.21-44.9,23.78-56.1A62.39,62.39,0,0,0,26,36c0,22.16,11.6,33.78,20.93,43.11C55.35,87.51,62,94.16,62,108,62,118.69,58,128.71,50.24,137.85Z"
    />
    <path
      class="logo__right"
      d="M56.21,0h-.1a2,2,0,0,0-1.5.66C47,9.05,40,20.85,40,36c0,16.36,8.17,24.55,16.83,33.21C65.81,78.17,76,88.36,76,108a57.09,57.09,0,0,1-8.4,29.83,2,2,0,0,0,1.71,3,1.94,1.94,0,0,0,.79-.17c22-9.32,37.9-37.21,37.9-70.18C108,31,85,1.45,56.21,0ZM78.62,128.41A62.27,62.27,0,0,0,82,108c0-22.16-11.6-33.77-20.93-43.11C52.65,56.5,46,49.84,46,36,46,25.3,50,15.28,57.78,6.13,83.12,8.65,102,35.92,102,70.56,102,94.41,92.8,116.35,78.62,128.41Z"
    />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "white",
      validator(value) {
        return ["white", "black", "color"].includes(value);
      },
    },
    height: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    logoClass() {
      switch (this.color) {
        case "white":
          return { "logo--white": true };
        case "black":
          return { "logo--black": true };
        case "color":
          return { "logo--color": true };
      }
    },
    logoHeight() {
      return { height: `${this.height}rem` };
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.logo {
  &--white {
    fill: $color-white;
  }
  &--black {
    fill: $color-black;
  }
  &--color {
    .logo__left {
      fill: $color-green;
    }
    .logo__right {
      fill: $color-gold;
    }
  }
}
</style>

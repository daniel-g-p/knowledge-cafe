<template>
  <button
    v-if="buttonType === 'button'"
    class="button"
    :class="[colorClass, styleClass]"
  >
    <slot></slot>
  </button>
  <router-link
    v-else
    :to="buttonLink"
    class="button"
    :class="[colorClass, styleClass]"
  >
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    buttonType: {
      type: String,
      default: "button",
      validator(value) {
        return ["button", "link"].includes(value);
      },
    },
    buttonColor: {
      type: String,
      default: "gold",
      validator(value) {
        return ["gold", "green", "white", "black"].includes(value);
      },
    },
    buttonStyle: {
      type: String,
      default: "fill",
      validator(value) {
        return ["fill", "outline"].includes(value);
      },
    },
    buttonLink: {
      type: Object,
      validator(value) {
        return value.name ? true : false;
      },
    },
  },
  computed: {
    colorClass() {
      switch (this.buttonColor) {
        case "gold":
          return { "button--gold": true };
        case "green":
          return { "button--green": true };
        case "black":
          return { "button--black": true };
        case "white":
          return { "button--white": true };
      }
    },
    styleClass() {
      switch (this.buttonStyle) {
        case "fill":
          return { "button--fill": true };
        case "outline":
          return { "button--outline": true };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.button {
  padding: 0.5em 1em;
  border-radius: 2em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.25s ease, color 0.25s ease;
  &--fill {
    &.button--gold {
      background-color: $color-gold;
      color: $color-white;
      &:hover,
      &:focus {
        background-color: lighten($color-gold, 10);
      }
    }
    &.button--green {
      background-color: $color-green;
      color: $color-white;
      &:hover,
      &:focus {
        background-color: lighten($color-green, 10);
      }
    }
    &.button--black {
      background-color: $color-black;
      color: $color-white;
      &:hover,
      &:focus {
        background-color: lighten($color-black, 10);
      }
    }
    &.button--white {
      background-color: $color-white;
      color: $color-gold;
      &:hover,
      &:focus {
        background-color: darken($color-white, 10);
      }
    }
  }
  &--outline {
    background: none;
    border: 2px solid currentColor;
    &.button--gold {
      color: $color-gold;
      &:hover,
      &:focus {
        color: lighten($color-gold, 10);
      }
    }
    &.button--green {
      color: $color-green;
      &:hover,
      &:focus {
        color: lighten($color-green, 10);
      }
    }
    &.button--black {
      color: $color-black;
      &:hover,
      &:focus {
        color: lighten($color-black, 10);
      }
    }
    &.button--white {
      color: $color-white;
      &:hover,
      &:focus {
        color: darken($color-white, 10);
      }
    }
  }
}
</style>

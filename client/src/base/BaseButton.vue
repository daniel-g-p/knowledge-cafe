<template>
  <button
    v-if="type === 'button'"
    class="button"
    :class="[colorClass, styleClass, activeClass]"
  >
    <div v-if="!loading" class="button__content"><slot></slot></div>
    <div v-else class="button__loader">
      <div class="button__loader-bar button__loader-bar--1"></div>
      <div class="button__loader-bar button__loader-bar--2"></div>
      <div class="button__loader-bar button__loader-bar--3"></div>
    </div>
  </button>
  <router-link
    v-else
    :to="link"
    class="button"
    :class="[colorClass, styleClass]"
  >
    <div v-if="!loading" class="button__content"><slot></slot></div>
    <div v-else class="button__loader">
      <div class="button__loader-bar button__loader-bar--1"></div>
      <div class="button__loader-bar button__loader-bar--2"></div>
      <div class="button__loader-bar button__loader-bar--3"></div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "button",
      validator(value) {
        return ["button", "link"].includes(value);
      },
    },
    color: {
      type: String,
      default: "gold",
      validator(value) {
        return ["gold", "green", "white", "black"].includes(value);
      },
    },
    style: {
      type: String,
      default: "fill",
      validator(value) {
        return ["fill", "outline"].includes(value);
      },
    },
    link: {
      type: Object,
      validator(value) {
        return value.name ? true : false;
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    colorClass() {
      switch (this.color) {
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
      switch (this.style) {
        case "fill":
          return { "button--fill": true };
        case "outline":
          return { "button--outline": true };
      }
    },
    activeClass() {
      return { "button--disabled": this.loading };
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  min-height: 2rem;
  border-radius: 2em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.25s ease, color 0.25s ease, opacity 0.25s ease;
  &__content {
    transition: transform 0.25s ease;
  }
  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__loader-bar {
    display: block;
    width: 0.5rem;
    background-color: currentColor;
    border-radius: 1rem;
    &--1 {
      animation: loading-animation 1s ease-in-out infinite;
    }
    &--2 {
      margin: 0 0.25rem;
      animation: loading-animation 1s ease-in-out 0.2s infinite;
    }
    &--3 {
      animation: loading-animation 1s ease-in-out 0.4s infinite;
    }
  }
  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
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

@keyframes loading-animation {
  0% {
    height: 0.5rem;
  }
  30% {
    height: 1rem;
    opacity: 0.5;
  }
  60% {
    height: 0.5rem;
  }
  100% {
    height: 0.5rem;
  }
}
</style>

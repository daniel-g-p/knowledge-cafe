<template>
  <div class="summary">
    <div class="summary__total">{{ formattedTotal }}</div>
    <button
      class="summary__button"
      :class="[animatedButton, rotatedButton]"
      @click="toggleCheckout"
    >
      <transition name="summary__icon-">
        <svg
          v-if="collapsed"
          xmlns="http://www.w3.org/2000/svg"
          class="summary__icon"
          viewBox="0 0 16 16"
        >
          <path
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="summary__icon"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
          />
          <path
            fill-rule="evenodd"
            d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
          />
        </svg>
      </transition>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      buttonHighlighted: false,
    };
  },
  computed: {
    total() {
      return this.$store.getters["shop/cartTotal"];
    },
    formattedTotal() {
      const multiple = (this.total * 100).toString();
      const { length } = multiple;
      return `€${multiple.slice(0, length - 2)},${multiple.slice(length - 2)}`;
    },
    animatedButton() {
      return { "summary__button--highlighted": this.buttonHighlighted };
    },
  },
  methods: {
    toggleCheckout() {
      this.$emit("toggle-checkout");
    },
  },
  watch: {
    total(value) {
      this.buttonHighlighted = true;
      setTimeout(() => {
        this.buttonHighlighted = false;
      }, 750);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.summary {
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  max-width: $screen-tablet-l;
  margin: 0 auto;
  &__total {
    font-size: 2rem;
    font-weight: 300;
  }
  &__button {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 0.125rem solid $color-white;
    position: relative;
    transition: background-color 0.25s ease, color 0.25s ease;
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: $color-white;
      color: $color-green;
    }
    &--highlighted {
      animation: highlight-button 0.75s linear forwards;
    }
  }
  &__icon {
    position: absolute;
    top: 25%;
    left: 25%;
    height: 50%;
    fill: currentColor;
    transition: transform 0.25s ease;
    &--enter-from,
    &--leave-to {
      transform: scale(0);
    }
    &--enter-to,
    &--leave-from {
      transform: scale(1);
    }
  }
}

@keyframes highlight-button {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>

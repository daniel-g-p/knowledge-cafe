<template>
  <div class="quantity">
    <button class="quantity__button" @click="minusOne">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="quantity__icon"
        viewBox="0 0 16 16"
      >
        <path d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
      </svg>
    </button>
    <div class="quantity__indicator">
      {{ modelValue }}
    </div>
    <button class="quantity__button" @click="plusOne">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="quantity__icon"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    plusOne() {
      if (this.modelValue < 5) {
        this.$emit("update:modelValue", this.modelValue + 1);
      }
    },
    minusOne() {
      if (this.modelValue > 1) {
        this.$emit("update:modelValue", this.modelValue - 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.quantity {
  display: flex;
  justify-content: flex-start;
  gap: 0.25rem;
  width: 100%;
  &__button {
    border: 0.125rem solid $color-green;
    border-radius: 0.25rem;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;
    color: $color-gold;
    transition: color 0.125s ease, background-color 0.125s ease;
    &:hover,
    &:focus {
      background-color: $color-green;
      color: $color-white;
    }
  }
  &__icon {
    fill: currentColor;
    height: 75%;
  }
  &__indicator {
    border: 0.125rem solid $color-green;
    border-radius: 0.25rem;
    font-size: 1.25rem;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
}
</style>

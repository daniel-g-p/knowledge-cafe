<template>
  <div class="quantity">
    <button class="quantity__button" @click="minusOne">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="quantity__icon"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
        />
      </svg>
    </button>
    <div class="quantity__input-box">
      <input class="quantity__input" type="number" v-model="quantity" />
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
  data() {
    return {
      quantity: 1,
    };
  },
  methods: {
    plusOne() {
      this.quantity++;
    },
    minusOne() {
      this.quantity--;
    },
  },
  watch: {
    quantity(value) {
      if (value < 1) {
        this.quantity = 1;
      } else if (value > 5) {
        this.quantity = 5;
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
  &__input-box {
    border: 0.125rem solid $color-green;
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__input {
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
    width: 100%;
    height: 100%;
  }
}
</style>

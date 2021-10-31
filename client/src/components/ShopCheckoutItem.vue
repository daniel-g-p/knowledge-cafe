<template>
  <div class="item">
    <button class="item__button" @click="removeItem">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="item__icon"
        viewBox="0 0 16 16"
      >
        <path
          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
        />
        <path
          fill-rule="evenodd"
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
        />
      </svg>
    </button>
    <div class="item__details">{{ itemDetails }}</div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    variation: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  emits: ["remove-item"],
  computed: {
    itemDetails() {
      const extraDetails = this.variation ? ` (${this.variation})` : "";
      return `${this.quantity} x ${this.name}${extraDetails}`;
    },
  },
  methods: {
    removeItem() {
      this.$store.dispatch("shop/removeCartItem", {
        id: this.id,
        variation: this.variation,
      });
      this.$emit("remove-item");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &__details {
    line-height: 1.25;
  }
  &__button {
    width: 2rem;
    height: 2rem;
    border: 0.125rem solid $color-white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;
    flex-shrink: 0;
    transition: color 0.25s ease, background-color 0.25s ease;
    cursor: pointer;
    &:hover,
    &:focus {
      color: $color-green;
      background-color: $color-white;
    }
  }
  &__icon {
    fill: currentColor;
    height: 50%;
  }
}
</style>

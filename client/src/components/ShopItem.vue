<template>
  <base-card>
    <div class="product" @click="selectProduct">
      <div class="product__name">{{ name }}</div>
      <div class="product__price">{{ formattedPrice }}</div>
    </div>
  </base-card>
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
    price: {
      type: Number,
      required: true,
    },
  },
  emits: ["select-product"],
  computed: {
    formattedPrice() {
      const multiple = (this.price * 100).toString();
      const { length } = multiple;
      return `€${multiple.slice(0, length - 2)},${multiple.slice(length - 2)}`;
    },
  },
  methods: {
    selectProduct() {
      this.$emit("select-product", this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: $color-grey-light;
  transition: background-color 0.25s ease;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: darken($color-grey-light, 5);
  }
}
</style>

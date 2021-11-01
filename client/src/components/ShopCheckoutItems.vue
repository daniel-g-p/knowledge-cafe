<template>
  <transition name="items-">
    <section v-if="!collapsed" class="items">
      <shop-checkout-item
        v-for="item in items"
        :key="`${item.id}-${item.variation}`"
        :id="item.id"
        :name="item.name"
        :variation="item.variation"
        :quantity="item.quantity"
        :price="item.price"
        @remove-item="removeItem"
      ></shop-checkout-item>
    </section>
  </transition>
</template>

<script>
import ShopCheckoutItem from "./ShopCheckoutItem.vue";

export default {
  components: {
    ShopCheckoutItem,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    collapsed: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["remove-item"],
  methods: {
    removeItem() {
      this.$emit("remove-item");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.items {
  border-top: 0.125rem solid $color-white;
  display: grid;
  gap: 1rem;
  padding-top: 1rem;
  &--enter-active {
    transition: opacity 0.75s ease 0.25s, transform 0.75s ease 0.25s;
  }
  &--enter-from,
  &--leave-to {
    opacity: 0;
    transform: translateY(1rem);
  }
  &--leave-active {
    transition-delay: 0.5s;
  }
}
</style>

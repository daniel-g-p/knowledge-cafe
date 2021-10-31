<template>
  <transition name="checkout-">
    <section v-if="cartItems.length" class="checkout" :class="collapsedClass">
      <shop-checkout-summary
        :collapsed="checkoutCollapsed"
        @toggle-checkout="toggleCheckout"
      ></shop-checkout-summary>
    </section>
  </transition>
</template>

<script>
import ShopCheckoutSummary from "./ShopCheckoutSummary.vue";

export default {
  components: {
    ShopCheckoutSummary,
  },
  data() {
    return {
      checkoutCollapsed: true,
    };
  },
  computed: {
    cartItems() {
      return this.$store.getters["shop/cartItems"];
    },
    collapsedClass() {
      return { "checkout--collapsed": this.checkoutCollapsed };
    },
  },
  methods: {
    toggleCheckout() {
      this.checkoutCollapsed = !this.checkoutCollapsed;
      this.$emit("toggle-checkout");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.checkout {
  background-color: $color-green;
  color: $color-white;
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  transition: top 0.5s ease;
  &--collapsed,
  &--enter-to,
  &--leave-from {
    top: calc(100vh - 4rem);
  }
  &--enter-from,
  &--leave-to {
    top: 100vh;
  }
}
</style>

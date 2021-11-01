<template>
  <transition name="checkout-">
    <section v-if="cartItems.length" class="checkout" :class="collapsedClass">
      <div class="checkout__content">
        <div>
          <shop-checkout-summary
            :collapsed="checkoutCollapsed"
            @toggle-checkout="toggleCheckout"
          ></shop-checkout-summary>
          <shop-checkout-items
            :items="cartItems"
            :collapsed="checkoutCollapsed"
            @remove-item="removeItem"
          ></shop-checkout-items>
        </div>
        <shop-checkout-form :collapsed="checkoutCollapsed"></shop-checkout-form>
      </div>
    </section>
  </transition>
</template>

<script>
import ShopCheckoutSummary from "./ShopCheckoutSummary.vue";
import ShopCheckoutItems from "./ShopCheckoutItems.vue";
import ShopCheckoutForm from "./ShopCheckoutForm.vue";

export default {
  components: {
    ShopCheckoutSummary,
    ShopCheckoutItems,
    ShopCheckoutForm,
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
    removeItem() {
      if (!this.cartItems.length) {
        this.toggleCheckout();
      }
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
  &__content {
    max-width: $screen-tablet-s;
    margin: 0 auto;
    padding: 0 1rem 1rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>

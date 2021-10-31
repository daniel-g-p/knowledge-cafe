<template>
  <transition>
    <section v-if="cartItems.length" class="checkout" :class="collapsedClass">
      <h1>{{ cartTotal }}</h1>
    </section>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      checkoutCollapsed: true,
    };
  },
  computed: {
    cartItems() {
      return this.$store.getters["shop/cartItems"];
    },
    cartTotal() {
        return this.$store.getters["shop/cartTotal"];
    },
    collapsedClass() {
      return { "checkout--collapsed": this.checkoutCollapsed };
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
  &--collapsed {
    top: 100vh;
    transform: translateY(-3rem);
  }
}
</style>

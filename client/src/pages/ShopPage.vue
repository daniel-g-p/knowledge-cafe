<template>
  <main class="shop">
    <base-title>Unser Angebot</base-title>
    <section class="shop__list">
      <shop-item
        v-for="item in shopItems"
        :id="item._id"
        :name="item.name"
        :price="item.price"
        @select-product="selectProduct"
      ></shop-item>
    </section>
  </main>
</template>

<script>
import ShopItem from "../components/ShopItem.vue";

export default {
  components: {
    ShopItem,
  },
  computed: {
    shopItems() {
      return this.$store.getters["shop/shopItems"];
    },
  },
  methods: {
    selectProduct(productId) {
      const product = this.shopItems.find((item) => item._id === productId);
      console.log(product);
    },
  },
  mounted() {
    this.$store.dispatch("shop/fetchItems");
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.shop {
  padding: 2rem 1rem;
  max-width: $screen-tablet-l;
  margin: 0 auto;
  &__list {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }
}
</style>

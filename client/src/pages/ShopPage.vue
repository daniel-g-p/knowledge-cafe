<template>
  <main class="shop">
    <base-title>Unser Angebot</base-title>
    <section class="shop__list">
      <shop-item
        v-for="item in shopItems"
        :id="item._id"
        :name="item.name"
        :price="item.price"
        @select-product="toggleProduct"
      ></shop-item>
    </section>
    <shop-item-modal
      :open="activeId ? true : false"
      :id="activeId"
      :name="activeName"
      :variations="activeVariations"
      @close-modal="toggleProduct"
    ></shop-item-modal>
  </main>
</template>

<script>
import ShopItem from "../components/ShopItem.vue";
import ShopItemModal from "../components/ShopItemModal.vue";

export default {
  components: {
    ShopItem,
    ShopItemModal,
  },
  data() {
    return {
      activeId: "",
    };
  },
  computed: {
    shopItems() {
      return this.$store.getters["shop/shopItems"];
    },
    activeName() {
      if (this.activeId) {
        const { name } = this.shopItems.find(
          (item) => item._id === this.activeId
        );
        return name;
      } else {
        return "";
      }
    },
    activeVariations() {
      if (this.activeId) {
        const { variations } = this.shopItems.find(
          (item) => item._id === this.activeId
        );
        return variations;
      } else {
        return [];
      }
    },
  },
  methods: {
    toggleProduct(productId) {
      this.activeId = productId || "";
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

<template>
  <main class="shop">
    <div class="shop__admin">
      <base-button v-if="isLoggedIn" type="link" :link="adminLink"
        >Zurück</base-button
      >
    </div>
    <base-title>Unser Angebot</base-title>
    <section class="shop__list">
      <shop-item
        v-for="item in shopItems"
        :id="item._id"
        :name="item.name"
        :price="item.price"
        @select-product="toggleProduct"
      ></shop-item>
      <p v-if="!shopItems.length">Es wurden keine Produkte gefunden.</p>
    </section>
    <shop-item-modal
      :open="activeId ? true : false"
      :id="activeId"
      :name="activeName"
      :variations="activeVariations"
      @close-modal="toggleProduct"
    ></shop-item-modal>
    <shop-checkout @toggle-checkout="toggleProduct"></shop-checkout>
  </main>
</template>

<script>
import ShopItem from "../components/ShopItem.vue";
import ShopItemModal from "../components/ShopItemModal.vue";
import ShopCheckout from "../components/ShopCheckout.vue";

export default {
  components: {
    ShopItem,
    ShopItemModal,
    ShopCheckout,
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
    isLoggedIn() {
      return this.$store.getters["authentication/loggedIn"];
    },
    adminLink() {
      return { name: "orders" };
    },
  },
  methods: {
    toggleProduct(productId) {
      this.activeId = productId || "";
    },
  },
  mounted() {
    if (!this.shopItems.length) {
      this.$store.dispatch("shop/fetchItems");
    }
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.shop {
  padding: 2rem 1rem;
  max-width: $screen-tablet-s;
  margin: 0 auto;
  @include responsive($screen-mobile-m) {
    padding: 3rem 1.5rem;
  }
  &__list {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    padding-bottom: 4rem;
  }
  &__admin {
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: flex-start;
  }
}
</style>

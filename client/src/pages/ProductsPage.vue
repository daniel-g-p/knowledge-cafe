<template>
  <section>
    <base-title>Produkte</base-title>
    <div class="products">
      <products-item
        v-for="product in products"
        :key="product._id"
        :id="product._id"
        :name="product.name"
        @select-item="selectItem"
      ></products-item>
    </div>
  </section>
</template>

<script>
import ProductsItem from "../components/ProductsItem.vue";

export default {
  components: {
    ProductsItem,
  },
  computed: {
    products() {
      return this.$store.getters["products/productList"];
    },
  },
  methods: {
    viewItem(itemId) {
      const item = this.products.find((product) => product._id === itemId);
      console.log(item);
    },
    editItem(itemId) {},
    deleteItem(itemId) {},
    selectItem(itemId, method) {
      switch (method) {
        case "view": {
          this.viewItem(itemId);
        }
        case "edit": {
          this.editItem(itemId);
        }
        case "delete": {
          this.deleteItem(itemId);
        }
      }
    },
  },
  mounted() {
    if (!this.products) {
      this.$store.dispatch("products/fetchProducts");
      console.log("FETCHING");
    }
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.products {
  display: grid;
  gap: 1rem;
}
</style>

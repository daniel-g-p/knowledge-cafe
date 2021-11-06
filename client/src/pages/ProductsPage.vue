<template>
  <section>
    <base-title>Produkte</base-title>
    <transition-group tag="div" name="products-" class="products">
      <products-item
        v-for="product in products"
        :key="product._id"
        :id="product._id"
        :name="product.name"
        @select-item="selectItem"
      ></products-item>
    </transition-group>
    <base-modal
      :open="viewMode ? true : false"
      :title="modalTitle"
      @close-modal="closeModal"
    >
      <products-item-details
        v-if="viewMode === 'view'"
        :name="activeProduct.name"
        :description="activeProduct.description"
        :price="activeProduct.price"
        :tag="activeProduct.tag"
        :variations="activeProduct.variations"
        :stats="activeProduct.stats"
      ></products-item-details>
      <products-item-form
        v-else-if="viewMode === 'edit'"
        :id="activeProduct.id"
        :name="activeProduct.name"
        :description="activeProduct.description"
        :price="activeProduct.price"
        :tag="activeProduct.tag"
        :variations="activeProduct.variations"
        @confirm-edits="confirmEdits"
        @edits-failed="emitError"
      ></products-item-form>
      <products-item-delete
        v-else-if="viewMode === 'delete'"
        :id="activeProduct.id"
        :name="activeProduct.name"
        @confirm-deletion="deleteProduct"
        @deletion-failed="emitError"
      ></products-item-delete>
      <p v-else-if="viewMode === 'error'">{{ errorMessage }}</p>
    </base-modal>
  </section>
</template>

<script>
import ProductsItem from "../components/ProductsItem.vue";
import ProductsItemDetails from "../components/ProductsItemDetails.vue";
import ProductsItemForm from "../components/ProductsItemForm.vue";
import ProductsItemDelete from "../components/ProductsItemDelete.vue";

export default {
  components: {
    ProductsItem,
    ProductsItemDetails,
    ProductsItemForm,
    ProductsItemDelete,
  },
  data() {
    return {
      viewMode: "",
      activeProduct: {
        id: "",
        name: "",
        description: "",
        price: 0,
        tag: "",
        variations: [],
        stats: {},
      },
      errorMessage: "",
    };
  },
  computed: {
    products() {
      return this.$store.getters["products/productList"];
    },
    modalTitle() {
      switch (this.viewMode) {
        case "view": {
          return "Produktinfo";
        }
        case "edit": {
          return "Bearbeiten";
        }
        case "delete": {
          return "Produkt löschen?";
        }
        case "error": {
          return "Fehler";
        }
      }
    },
  },
  methods: {
    selectItem(itemId, mode) {
      const item = this.products.find((product) => product._id === itemId);
      this.activeProduct.id = item._id;
      this.activeProduct.name = item.name;
      this.activeProduct.description = item.description;
      this.activeProduct.price = item.price;
      this.activeProduct.tag = item.tag;
      this.activeProduct.variations = item.variations;
      this.activeProduct.stats = item.stats;
      this.viewMode = mode;
    },
    closeModal() {
      this.viewMode = "";
      this.activeProduct = {
        id: "",
        name: "",
        description: "",
        price: 0,
        tag: "",
        variations: [],
        stats: {},
      };
    },
    confirmEdits(productId, productData) {
      this.closeModal();
      this.$store.dispatch("products/editProduct", { productId, productData });
      setTimeout(() => {
        this.selectItem(productId, "view");
      }, 500);
    },
    deleteProduct(productId) {
      this.closeModal();
      this.$store.dispatch("products/deleteProduct", productId);
    },
    emitError(message) {
      this.errorMessage =
        message ||
        "Ein Fehler ist aufgetreten, bitte versuche es später erneut.";
      this.viewMode = "error";
    },
  },
  mounted() {
    if (!this.products) {
      this.$store.dispatch("products/fetchProducts");
    }
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.products {
  display: grid;
  gap: 1rem;
  &--leave-active {
    transition: opacity 0.5s ease;
  }
  &--leave-from {
    opacity: 1;
  }
  &--leave-to {
    opacity: 0;
  }
}
</style>

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
      ></products-item-details
    ></base-modal>
  </section>
</template>

<script>
import ProductsItem from "../components/ProductsItem.vue";
import ProductsItemDetails from "../components/ProductsItemDetails.vue";

export default {
  components: {
    ProductsItem,
    ProductsItemDetails,
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
    };
  },
  computed: {
    products() {
      return this.$store.getters["products/productList"];
    },
    modalTitle() {
      switch (this.viewMode) {
        case "view": {
          return "Info";
        }
        case "view": {
          return "Info";
        }
        case "view": {
          return "Info";
        }
      }
    },
  },
  methods: {
    viewItem(itemId) {
      const item = this.products.find((product) => product._id === itemId);
      this.activeProduct.id = item._id;
      this.activeProduct.name = item.name;
      this.activeProduct.description = item.description;
      this.activeProduct.price = item.price;
      this.activeProduct.tag = item.tag;
      this.activeProduct.variations = item.variations;
      this.activeProduct.stats = item.stats;
      this.viewMode = "view";
    },
    editItem(itemId) {},
    deleteItem(itemId) {},
    selectItem(itemId, mode) {
      switch (mode) {
        case "view": {
          return this.viewItem(itemId);
        }
        case "edit": {
          return this.editItem(itemId);
        }
        case "delete": {
          return this.deleteItem(itemId);
        }
      }
    },
    closeModal(mode) {
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
}
</style>

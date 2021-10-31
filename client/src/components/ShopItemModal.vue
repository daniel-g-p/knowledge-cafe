<template>
  <base-modal :title="name" :open="open" @close-modal="closeModal">
    <shop-item-quantity></shop-item-quantity>
    <base-button>Hello</base-button>
  </base-modal>
</template>

<script>
import ShopItemQuantity from "./ShopItemQuantity.vue";

export default {
  components: {
    ShopItemQuantity,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    variations: {
      type: Array,
      default: [],
    },
  },
  emits: ["close-modal"],
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

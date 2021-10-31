<template>
  <base-modal :title="name" :open="open" @close-modal="closeModal">
    <div class="form">
      <shop-item-quantity v-model="quantity"></shop-item-quantity>
      <base-select
        v-if="selectOptions.length"
        :options="selectOptions"
        :error="selectError"
        name="Sorte auswählen"
        v-model="variation"
        @remove-error="removeSelectError"
      ></base-select>
    </div>
    <base-button @click="addItem">Hinzufügen</base-button>
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
  data() {
    return {
      quantity: 1,
      variation: "",
      selectError: false,
    };
  },
  computed: {
    selectOptions() {
      return this.variations.map((item, index) => {
        return { id: `option${index}`, label: item };
      });
    },
  },
  methods: {
    closeModal() {
      this.quantity = 1;
      this.variation = "";
      this.selectError = false;
      this.$emit("close-modal");
    },
    removeSelectError() {
      this.selectError = false;
    },
    addItem() {
      if (!this.variation && this.selectOptions.length) {
        this.selectError = true;
      } else {
        const selection = this.selectOptions.find((item) => {
          return item.id === this.variation;
        });
        console.log(
          `${this.quantity} x ${this.name} (${
            selection ? selection.label : ""
          })`
        );
        this.closeModal();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.form {
  display: grid;
  gap: 0.75rem;
}
</style>

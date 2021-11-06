<template>
  <base-modal :open="open" :title="name">
    <base-info label="Kürzel">{{ upperCaseTag }}</base-info>
    <base-info label="Beschreibung">{{ description }}</base-info>
    <base-info label="Verkaufspreis">{{ formattedPrice }}</base-info>
    <base-info label="Verkaufte Einheiten">{{ stats.unitsSold }}</base-info>
    <base-info label="Gesamteinnahmen">{{ formattedRevenue }}</base-info>
    <products-item-chart
      v-if="variations.length"
      :variations="variations"
      :stats="stats.variations"
    ></products-item-chart>
  </base-modal>
</template>

<script>
import ProductsItemChart from "./ProductsItemChart.vue";

export default {
  components: {
    ProductsItemChart,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    variations: {
      type: Array,
      required: true,
    },
    stats: {
      type: Object,
      required: true,
    },
  },
  computed: {
    upperCaseTag() {
      return this.tag.toUpperCase();
    },
    formattedPrice() {
      const multiple = (this.price * 100).toString();
      const { length } = multiple;
      return `€${multiple.slice(0, length - 2)},${multiple.slice(length - 2)}`;
    },
    formattedRevenue() {
      const multiple = (this.stats.revenue * 100).toString();
      const { length } = multiple;
      return `€${multiple.slice(0, length - 2)},${multiple.slice(length - 2)}`;
    },
  },
};
</script>

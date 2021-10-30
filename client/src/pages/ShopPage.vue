<template>
  <main class="shop">
    <base-title>Unser Angebot</base-title>
    <section class="shop__items"></section>
  </main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({ fetchItems: "shop/fetchItems" }),
  },
  mounted() {
    this.fetchItems();
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.shop {
  padding: 2rem 1rem;
  max-width: $screen-tablet-l;
  margin: 0 auto;
}
</style>

<template>
  <section>
    <base-title>Bestellungen</base-title>
    <div class="orders">
      <div v-for="order in pendingOrders">{{ order._id }}</div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    pendingOrders() {
      return this.$store.getters["orders/pendingOrders"];
    },
  },
  methods: {
    fetchOrders() {
      this.$store.dispatch("orders/fetchOrders");
    },
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>

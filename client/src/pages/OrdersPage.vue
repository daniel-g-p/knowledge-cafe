<template>
  <section>
    <base-title>Bestellungen</base-title>
    <div class="orders">
      <order-item
        v-for="order in pendingOrders"
        :key="order._id"
        :id="order._id"
        :customerName="order.customerName"
        :total="order.total"
        :items="order.items"
        :paymentMethod="order.paymentMethod"
        :comments="order.comments"
      ></order-item>
    </div>
  </section>
</template>

<script>
import OrderItem from "../components/OrderItem.vue";
export default {
  components: {
    OrderItem,
  },
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

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.orders {
  display: grid;
  gap: 1rem;
}
</style>

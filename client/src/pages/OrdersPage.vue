<template>
  <section>
    <base-title>Bestellungen</base-title>
    <event-status></event-status>
    <transition-group name="orders-" tag="div" class="orders">
      <order-item
        v-for="order in pendingOrders"
        :key="order._id"
        :id="order._id"
        :customerName="order.customerName"
        :total="order.total"
        :items="order.items"
        :paymentMethod="order.paymentMethod"
        :comments="order.comments"
        @completion-failed="openModal"
      ></order-item>
    </transition-group>
    <base-modal title="Fehler" :open="modal.open" @close-modal="closeModal">
      {{ modal.message }}
    </base-modal>
  </section>
</template>

<script>
import OrderItem from "../components/OrderItem.vue";
import EventStatus from "../components/EventStatus.vue";

export default {
  components: {
    OrderItem,
    EventStatus,
  },
  data() {
    return {
      modal: { open: false, message: "" },
    };
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
    openModal(orderId) {
      this.modal.message = `Die Bestellung #${orderId} konnte nicht abgeschlossen werden, bitte versuche es erneut.`;
      this.modal.open = true;
    },
    closeModal() {
      this.modal.open = false;
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
  width: 100%;
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

<template>
  <section>
    <base-title>Bestellungen</base-title>
    <order-controls
      :event-active="eventActive"
      @event-error="openModal"
      @event-success="confirmEventEnd"
    ></order-controls>
    <orders-page-info
      :event-active="eventActive"
      :orders-length="pendingOrders.length"
    ></orders-page-info>
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
    <base-modal
      :title="modal.title"
      :open="modal.open"
      @close-modal="closeModal"
    >
      {{ modal.message }}
    </base-modal>
  </section>
</template>

<script>
import OrderItem from "../components/OrderItem.vue";
import OrderControls from "../components/OrderControls.vue";
import OrdersPageInfo from "../components/OrdersPageInfo.vue";

export default {
  components: {
    OrderItem,
    OrderControls,
    OrdersPageInfo,
  },
  data() {
    return {
      modal: { open: false, title: "Fehler", message: "" },
    };
  },
  computed: {
    pendingOrders() {
      return this.$store.getters["orders/pendingOrders"];
    },
    eventActive() {
      return this.$store.getters["orders/eventStatus"] === "active";
    },
  },
  methods: {
    fetchOrders() {
      this.$store.dispatch("orders/fetchOrders");
    },
    openModal(message, title = "Fehler") {
      this.modal.message = message;
      this.modal.title = title;
      this.modal.open = true;
    },
    closeModal() {
      this.modal.open = false;
    },
    confirmEventEnd(eventId) {
      this.openModal(
        "Das Event wurde erfolgreich abgeschlossen und gespeichert.",
        "Glückwunsch!"
      );
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

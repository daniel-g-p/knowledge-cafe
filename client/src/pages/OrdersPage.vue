<template>
  <section>
    <base-title>Bestellungen</base-title>
    <order-controls
      :event-active="eventActive"
      @event-error="openModal"
    ></order-controls>
    <div class="info">
      <p v-if="!eventActive" class="info__text">
        Der Verkauf ist zurzeit nicht freigegeben. Aktiviere ihn, um
        Bestellungen entgegennehmen zu können.
      </p>
      <p v-else-if="!pendingOrders.length" class="info__text">
        Es gibt zurzeit keine Bestellungen, nutzt die Zeit doch einfach, um
        <span class="info__text--strikethrough"
          >euch selbst einen Kaffee zu kochen</span
        >
        den Kaffeestand auf Vordermann zu bringen ;)
      </p>
    </div>
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
import OrderControls from "../components/OrderControls.vue";

export default {
  components: {
    OrderItem,
    OrderControls,
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
    eventActive() {
      return this.$store.getters["orders/eventStatus"] === "active";
    },
    infoText() {
      if (!this.eventActive) {
        return "Bitten gebe den Verkauf frei, um Bestellungen entgegennehmen zu könnnen.";
      } else if (!this.pendingOrders.length) {
      }
    },
  },
  methods: {
    fetchOrders() {
      this.$store.dispatch("orders/fetchOrders");
    },
    openModal(message) {
      this.modal.message =
        message ||
        "Die Bestellung konnte nicht abgeschlossen werden, bitte versuche es erneut.";
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
.info {
  &__text {
    line-height: 1.25;
    margin-bottom: 1rem;
    &--strikethrough {
      text-decoration: line-through;
    }
  }
}

@keyframes info-appear {
  from {
    display: none;
  }
  to {
    display: block;
  }
}
</style>
